/*
 * checker-layout.js
 *
 * Reusable browser-console checker for the contact editor in this clone and
 * contacts.google.com. Load this file, then call:
 *   await runCheckerLayout() // all fields
 *   await runCheckerLayout(['Sitio web', 'Persona relacionada']) // selected fields
 * It starts a new local-clone contact if needed and otherwise requires a
 * blank, unsaved “new contact” form.
 * It expands the available sections, adds and fills two rows for every
 * repeatable field type, adds a third blank row, then returns and downloads a
 * JSON report with box measurements and computed CSS. It never presses Save.
 */
window.runCheckerLayout = async function runCheckerLayout(requestedFields = null) {
  const wait = (ms = 80) => new Promise(resolve => setTimeout(resolve, ms));
  const normalize = value => (value || '').replace(/\s+/g, ' ').trim();
  const normalizeKey = value => normalize(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase();
  const canonicalField = value => {
    const label = normalizeKey(value);
    if (/sitio web|website|web site/.test(label)) return 'website';
    if (/persona relacionada|related person|relationship/.test(label)) return 'relationship';
    if (/correo|e-mail|\bemail\b/.test(label)) return 'email';
    if (/telefono|phone/.test(label)) return 'phone';
    if (/fecha importante|important date|\bevent\b/.test(label)) return 'event';
    if (/campo personalizado|custom field|\bcustom\b/.test(label)) return 'custom';
    if (/direccion|address/.test(label)) return 'address';
    if (/fonet|phonetic/.test(label)) return 'phonetic-name';
    if (/segundo nombre|middle name/.test(label)) return 'middle-name';
    if (/apellidos|apellido|surname|last name/.test(label)) return 'last-name';
    if (/prefijo|prefix/.test(label)) return 'prefix';
    if (/sufijo|suffix/.test(label)) return 'suffix';
    if (/d[ií]a|\bday\b/.test(label)) return 'day';
    if (/mes|\bmonth\b/.test(label)) return 'month';
    if (/a[nñ]o|\byear\b/.test(label)) return 'year';
    if (/pa[ií]s|country|territor|region/.test(label)) return 'country';
    if (/nota|\bnotes\b/.test(label)) return 'notes';
    if (/etiqueta|\blabel\b/.test(label)) return 'label';
    if (/empresa|organization|\bcompany\b/.test(label)) return 'company';
    if (/puesto|job title|position/.test(label)) return 'job-title';
    if (/departamento|department/.test(label)) return 'department';
    if (/^org$|organization|\bcompany\b|empresa/.test(label)) return 'company';
    if (/^birthday$|date of birth|fecha de nacimiento/.test(label)) return 'birthday';
    if (/^name$/.test(label)) return 'first-name';
    if (/^nombre$|^name$|first name|\bnombre\b/.test(label)) return 'first-name';
    return label;
  };
  const requestedNames = requestedFields === null
    ? null
    : (Array.isArray(requestedFields) ? requestedFields : [requestedFields]).map(normalize).filter(Boolean);
  if (requestedFields !== null && !requestedNames?.length) {
    throw new Error('Pasa null para todos los campos o una lista con labels como ["Sitio web", "Persona relacionada"].');
  }
  const selectedFields = requestedNames ? new Set(requestedNames.map(canonicalField)) : null;
  const selectedNameMatches = value => !selectedFields || selectedFields.has(canonicalField(value));
  const visible = element => {
    const rect = element.getBoundingClientRect();
    const style = getComputedStyle(element);
    return rect.width > 0 && rect.height > 0 && style.display !== 'none' && style.visibility !== 'hidden';
  };
  const accessibleName = element => normalize(
    element.getAttribute('aria-label') || element.getAttribute('title') || element.innerText || element.textContent
  );
  const controlLabel = element => {
    const labelledBy = normalize((element.getAttribute('aria-labelledby') || '')
      .split(/\s+/).map(id => document.getElementById(id)?.innerText || '').join(' '));
    const candidates = [
      element.getAttribute('aria-label'), labelledBy,
      element.labels?.[0]?.innerText,
      element.closest('.field')?.querySelector('label')?.innerText,
      element.closest('[data-idom-container-class]')?.querySelector('[jsname="V67aGc"]')?.textContent,
      element.getAttribute('placeholder'), element.getAttribute('name'), element.getAttribute('title'),
      element.getAttribute('role') === 'combobox' ? element.innerText : ''
    ];
    return candidates.map(normalize).find(Boolean) || 'Campo';
  };
  const isFieldControl = element => /^(INPUT|TEXTAREA|SELECT)$/.test(element.tagName) || element.getAttribute('role') === 'combobox';
  const selectionContext = element => {
    const names = [
      element.getAttribute('aria-label'), element.getAttribute('title'), element.getAttribute('data-variant'),
      isFieldControl(element) ? controlLabel(element) : accessibleName(element),
      typeof element.className === 'string' ? element.className : ''
    ].filter(Boolean);
    let ancestor = element;
    while (ancestor && ancestor !== document.body) {
      const classes = typeof ancestor.className === 'string' ? ancestor.className : '';
      if (ancestor === element || ancestor.hasAttribute('data-variant') ||
          /(repeat|row|field|country|birthday|important-date)/i.test(classes)) {
        if (ancestor.hasAttribute('data-variant')) names.push(ancestor.getAttribute('data-variant'));
        if (typeof ancestor.className === 'string') names.push(ancestor.className);
        names.push(...[...ancestor.querySelectorAll('input:not([type="file"]),textarea,select,[role="combobox"]')]
          .map(controlLabel));
      }
      ancestor = ancestor.parentElement;
    }
    return names;
  };
  const isSelectedElement = element => !selectedFields ||
    selectionContext(element).some(name => selectedNameMatches(name));
  const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
  const slug = () => Math.random().toString(36).slice(2, 8);
  const isClone = Boolean(document.querySelector('.app-shell') || document.querySelector('.contact-form') ||
    ((location.hostname === 'localhost' || location.hostname === '127.0.0.1') && location.port === '5173'));
  const isGoogle = location.hostname === 'contacts.google.com' || location.hostname.endsWith('.contacts.google.com');
  const platform = isClone ? 'clone' : isGoogle ? 'google-contacts' : 'unknown';

  if (!isClone && !isGoogle) {
    throw new Error('checker-layout.js solo funciona en el clon o en contacts.google.com.');
  }

  if (isClone && !document.querySelector('.contact-form')) {
    const createContact = [...document.querySelectorAll('button,[role="button"]')]
      .find(element => visible(element) && /^(crear contacto|create contact)$/i.test(accessibleName(element)));
    if (!createContact) throw new Error('Abre la pantalla de Contactos del clon para iniciar un contacto nuevo.');
    createContact.click();
    await wait(200);
  }

  const hasVisibleFormControl = candidate => [...candidate.querySelectorAll(
    'input:not([type="file"]),textarea,select,[role="combobox"],button,[role="button"]'
  )].some(visible);
  let root = isClone
    ? [...document.querySelectorAll('.contact-form')].find(candidate => visible(candidate) && hasVisibleFormControl(candidate))
    : [...document.querySelectorAll('[jscontroller="AjLGEe"][jsname="L9AdLc"]')]
      .find(candidate => visible(candidate) && hasVisibleFormControl(candidate));
  const allInputs = () => [...(root || document).querySelectorAll('input:not([type="file"]), textarea')];
  const startInput = () => allInputs().find(element => visible(element) &&
    /^(prefijo|prefix)$/i.test(normalize(element.getAttribute('aria-label') || element.getAttribute('placeholder'))));
  const endButton = () => {
    const candidates = [...root.querySelectorAll('button,[role="button"]')]
      .filter(element => visible(element) && /^(mostrar menos|show less)$/i.test(accessibleName(element)));
    const notesControl = allInputs().find(element => canonicalField(controlLabel(element)) === 'notes');
    if (notesControl) {
      const afterNotes = candidates.filter(element =>
        Boolean(notesControl.compareDocumentPosition(element) & Node.DOCUMENT_POSITION_FOLLOWING)
      );
      if (afterNotes.length) return afterNotes.at(-1);
    }
    return candidates.at(-1) || null;
  };

  if (!root) {
    throw new Error('No encuentro el formulario de contacto.');
  }

  const expansionControls = [...root.querySelectorAll('button,[role="button"],[role="checkbox"],input[type="checkbox"]')]
    .filter(element => visible(element) && /^(mostrar más|show more)(\b|\s)/i.test(accessibleName(element)))
    .filter(element => {
      if (!selectedFields) return true;
      const isNameSection = Boolean(element.closest('.name-field-row,[data-variant="name"]'));
      const isBottomMore = element.matches('.more-fields-toggle') ||
        (/^(mostrar más|show more)$/i.test(accessibleName(element)) && !element.closest('.name-field-row,[data-variant="name"],.company-field-row,[data-variant="org"]'));
      return isNameSection || isBottomMore || isSelectedElement(element);
    });
  for (const control of expansionControls) {
    if (!control.isConnected || !visible(control)) continue;
    control.click();
    await wait(150);
  }
  if (!startInput() || !endButton()) {
    throw new Error('Tras expandir el formulario no encuentro el rango desde “Prefijo” hasta “Mostrar menos”.');
  }

  const existingValues = allInputs().filter(element => isSelectedElement(element) && normalize(element.value));
  if (existingValues.length) {
    throw new Error('El formulario ya contiene datos. Abre un contacto nuevo en otra pestaña para no sobrescribirlos.');
  }

  const clickButton = async label => {
    const button = [...root.querySelectorAll('button,[role="button"]')]
      .find(element => visible(element) && accessibleName(element) === label);
    if (!button) return false;
    button.click();
    await wait(isGoogle ? 300 : 100);
    return true;
  };
  const removeButtons = () => [...root.querySelectorAll('button,[role="button"]')]
    .filter(element => visible(element) && /^(quitar|remove|eliminar|delete)\b/i.test(accessibleName(element)));

  if (isClone) {
    if ((!selectedFields || selectedFields.has('address')) && !root.querySelector('.country-field')) await clickButton('Añadir dirección');
  }

  const isRepeatableAddAction = label => /^(añadir|agregar|add)\b/i.test(label) &&
    !/(fecha de nacimiento|birthday|foto|photo|etiqueta|label)/i.test(label);
  const discoverRepeatableActions = () => [...new Set(
    [...root.querySelectorAll('button,[role="button"]')]
      .filter(visible)
      .map(accessibleName)
      .filter(label => isRepeatableAddAction(label) && selectedNameMatches(label))
  )];
  const actionVariant = label => canonicalField(normalize(label).replace(/^(añadir|agregar|add)\s+/i, ''));
  const addressAlreadyVisible = [...root.querySelectorAll('[aria-label*="País"],[aria-label*="Country"],[data-variant="address"]')].some(visible);
  const repeatableActions = discoverRepeatableActions();
  for (const label of repeatableActions) {
    const addressAction = /(direcci[oó]n|address)/i.test(label);
    const variant = actionVariant(label);
    const existingMatchingRows = removeButtons().filter(button => canonicalField(accessibleName(button)) === variant).length;
    const unremovableAddressPrimary = addressAction && addressAlreadyVisible && isClone && existingMatchingRows === 0 ? 1 : 0;
    const existingRows = existingMatchingRows + unremovableAddressPrimary;
    const count = Math.max(0, 2 - existingRows);
    for (let index = 0; index < count; index += 1) {
      if (!await clickButton(label)) break;
    }
  }

  const labelOptions = new Set(['etiqueta', 'label']);
  const fieldLabel = element => normalize(
    controlLabel(element)
  );

  const randomValue = (element, index) => {
    const label = fieldLabel(element).toLocaleLowerCase();
    const type = (element.getAttribute('type') || '').toLowerCase();
    if (element.tagName === 'TEXTAREA' || /notas|notes/.test(label)) return `Nota de prueba ${slug()} ${index}`;
    if (type === 'email' || /correo|e-mail|email/.test(label)) return `contacto${slug()}@example.test`;
    if (type === 'tel' || /tel[eé]fono|phone/.test(label)) return `6${randomInt(10000000, 99999999)}`;
    if (type === 'url' || /sitio web|website/.test(label)) return `https://example.test/${slug()}`;
    if (/d[ií]a|day/.test(label)) return String(randomInt(1, 28));
    if (/año|year/.test(label)) return String(randomInt(1970, 2004));
    if (/prefijo|prefix|suffix|sufijo/.test(label)) return `P-${slug()}`;
    if (/nombre|name/.test(label)) return `Nombre-${slug()}`;
    if (/pa[ií]s|country|territorio|region/.test(label)) return 'España';
    return `Prueba-${slug()}-${index}`;
  };

  const setValue = (element, value) => {
    const prototype = element.tagName === 'TEXTAREA' ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
    const setter = Object.getOwnPropertyDescriptor(prototype, 'value')?.set;
    if (setter) setter.call(element, value);
    else element.value = value;
    element.dispatchEvent(new InputEvent('input', { bubbles: true, inputType: 'insertText', data: value }));
    element.dispatchEvent(new Event('change', { bubbles: true }));
  };

  for (let pass = 0; pass < 8; pass += 1) {
    let changed = false;
    const fields = allInputs().filter(element => visible(element) && isSelectedElement(element) && !normalize(element.value));
    for (let index = 0; index < fields.length; index += 1) {
      const element = fields[index];
      if (!element.isConnected || normalize(element.value)) continue;
      setValue(element, randomValue(element, index + pass * 100));
      changed = true;
      await wait(25);
    }
    if (!changed) break;
    await wait(150);
  }

  for (const select of [...root.querySelectorAll('select')].filter(element => visible(element) && isSelectedElement(element))) {
    const options = [...select.options].filter(option => normalize(option.value) && normalize(option.textContent));
    if (!options.length) continue;
    const option = options[randomInt(0, options.length - 1)];
    const setter = Object.getOwnPropertyDescriptor(HTMLSelectElement.prototype, 'value')?.set;
    if (setter) setter.call(select, option.value);
    else select.value = option.value;
    select.dispatchEvent(new Event('change', { bubbles: true }));
    await wait(25);
  }

  const processedCombos = new Set();
  for (let pass = 0; pass < 120; pass += 1) {
    const combos = [...root.querySelectorAll('[role="combobox"],[aria-haspopup="listbox"],.country-trigger')]
      .filter(element => visible(element) && isSelectedElement(element));
    const index = combos.findIndex((element, itemIndex) => !processedCombos.has(itemIndex));
    if (index < 0) break;
    const next = combos[index];
    processedCombos.add(index);
    next.click();
    await wait(120);
    const options = [...document.querySelectorAll('[role="option"],[role="menuitemradio"],.country-option')]
      .filter(option => visible(option) && normalize(option.textContent) && option.getAttribute('aria-disabled') !== 'true');
    if (options.length) {
      options[randomInt(0, options.length - 1)].click();
      await wait(100);
    } else if (next.getAttribute('aria-expanded') === 'true') {
      next.click();
      await wait(50);
    }
  }

  const rowFromRemoveButton = button => {
    let parent = button?.parentElement;
    while (parent && parent !== root) {
      const removes = [...parent.querySelectorAll('button,[role="button"]')]
        .filter(element => /^(quitar|remove|eliminar|delete)\b/i.test(accessibleName(element)));
      const controls = [...parent.querySelectorAll('input:not([type="file"]),textarea,select')].filter(visible);
      if (removes.length === 1 && controls.length) return parent;
      parent = parent.parentElement;
    }
    return null;
  };
  const variantFor = row => row?.getAttribute('data-variant') || row?.closest('[data-variant]')?.getAttribute('data-variant') || '';
  const rowFields = row => row
    ? [...row.querySelectorAll('input:not([type="file"]),textarea,select,[role="combobox"]')].filter(visible)
    : [];
  const isOptionalLabel = element => labelOptions.has(normalizeKey(controlLabel(element)));
  const dateAction = discoverRepeatableActions().find(action => /(fecha importante|important date)/i.test(action));
  const dateWords = normalize((dateAction || '').replace(/^(añadir|agregar|add)\s+/i, '')).toLocaleLowerCase().split(/\s+/).filter(word => word.length > 2);
  const populatedDateRows = removeButtons()
    .filter(button => dateWords.length && dateWords.every(word => accessibleName(button).toLocaleLowerCase().includes(word)))
    .map(rowFromRemoveButton).filter(Boolean).slice(0, 2);
  const dateFieldChecks = populatedDateRows.map((row, index) => {
    const controls = rowFields(row);
    const day = controls.find(control => /d[ií]a|day/i.test(controlLabel(control)) && !/año|year/i.test(controlLabel(control)));
    const month = controls.find(control => /^(mes|month)$/i.test(controlLabel(control)));
    const year = controls.find(control => /año|year/i.test(controlLabel(control)));
    const dayValid = Boolean(day && /^(?:[1-9]|[12]\d|3[01])$/.test(normalize(day.value)));
    const yearValid = Boolean(year && /^\d{4}$/.test(normalize(year.value)));
    const monthText = month ? normalize(month.tagName === 'SELECT'
      ? month.value
      : month.getAttribute('aria-valuetext') || month.innerText || month.textContent)
      .split(/\s+/).filter(token => token && !/^(mes|month|expand_more|more_vert)$/i.test(token)) : [];
    const monthSelected = monthText.length > 0;
    return { row: index + 1, fieldLabels: controls.map(controlLabel).filter(label => label !== 'Campo'), dayValid, monthSelected, yearValid, passed: dayValid && monthSelected && yearValid };
  });
  const blankRowChecks = [];
  for (const action of discoverRepeatableActions()) {
    const added = await clickButton(action);
    await wait(isGoogle ? 350 : 180);
    const variant = actionVariant(action);
    const matchingRemovers = removeButtons().filter(button => canonicalField(accessibleName(button)) === variant);
    const row = rowFromRemoveButton(matchingRemovers.at(-1));
    const fields = rowFields(row);
    const contentFields = fields.filter(field => !isOptionalLabel(field) && field.getAttribute('role') !== 'combobox');
    const labelField = fields.find(isOptionalLabel);
    const isBlank = contentFields.length > 0 && contentFields.every(field => !normalize(field.value));
    const labels = contentFields.map(controlLabel).filter(label => label !== 'Campo');
    const unremovableAddressPrimary = variant === 'address' && addressAlreadyVisible && isClone ? 1 : 0;
    const observedRowCount = matchingRemovers.length + unremovableAddressPrimary;
    const expectedOptionalLabelVisible = isGoogle && ['address', 'event'].includes(variant);
    const labelVisibilityPassed = Boolean(labelField) === expectedOptionalLabelVisible;
    blankRowChecks.push({
      action,
      inferredVariant: variantFor(row) || variant || null,
      inferredFieldLabels: labels,
      targetRowCount: 3,
      observedRowCount,
      filledRowsBeforeBlank: Math.max(0, observedRowCount - 1),
      rowFound: Boolean(row),
      blank: isBlank,
      optionalLabelVisible: Boolean(labelField),
      expectedOptionalLabelVisible,
      labelVisibilityPassed,
      passed: Boolean(added && row && observedRowCount === 3 && isBlank && labelVisibilityPassed)
    });
  }

  const start = startInput();
  const end = endButton();
  const startBoundary = isClone ? start.closest('.name-field-row') || start : start.closest('[data-idom-container-class]') || start;
  const isAfterStart = element => element === startBoundary || element.contains(startBoundary) ||
    Boolean(startBoundary.compareDocumentPosition(element) & Node.DOCUMENT_POSITION_FOLLOWING);
  const isBeforeEnd = element => element === end || element.contains(end) ||
    Boolean(element.compareDocumentPosition(end) & Node.DOCUMENT_POSITION_FOLLOWING);
  const elements = [...root.querySelectorAll('*')]
    .filter(element => {
      if (!isAfterStart(element) || !isBeforeEnd(element) || !visible(element) || !isSelectedElement(element)) return false;
      const style = getComputedStyle(element);
      const tag = element.tagName.toLowerCase();
      const className = typeof element.className === 'string' ? element.className : '';
      return /^(input|textarea|select|button|label)$/.test(tag) ||
        element.hasAttribute('role') || element.hasAttribute('data-variant') ||
        element.hasAttribute('data-idom-container-class') ||
        /^(flex|inline-flex|grid|inline-grid)$/.test(style.display) ||
        /(field|row|repeat|group|form|layout|toolbar|country)/i.test(className);
    });
  const elementRole = element => {
    const tag = element.tagName.toLowerCase();
    if (/^(input|textarea|select)$/.test(tag)) return 'control';
    if (tag === 'button' || element.getAttribute('role') === 'button') return 'action';
    if (tag === 'label') return 'label';
    const display = getComputedStyle(element).display;
    if (/^(flex|inline-flex|grid|inline-grid)$/.test(display)) return 'layout';
    return 'container';
  };
  const reportFieldLabel = value => {
    const labels = {
      prefix: 'Prefijo', 'first-name': 'Nombre', 'middle-name': 'Segundo nombre', 'last-name': 'Apellidos',
      suffix: 'Sufijo', email: 'Correo electrónico', phone: 'Teléfono', address: 'Dirección postal',
      birthday: 'Fecha de nacimiento', event: 'Fecha importante', website: 'Sitio web',
      relationship: 'Persona relacionada', custom: 'Campo personalizado', notes: 'Notas',
      day: 'Día', month: 'Mes', year: 'Año (opcional)', country: 'País/territorio', label: 'Etiqueta',
      company: 'Empresa', 'job-title': 'Puesto de trabajo', department: 'Departamento'
    };
    const normalized = normalize(value);
    return labels[canonicalField(normalized)] || normalized;
  };
  const domPath = element => {
    const path = [];
    let current = element;
    while (current && current !== root && path.length < 5) {
      const classes = typeof current.className === 'string' ? current.className.trim().split(/\s+/).slice(0, 2) : [];
      const part = [current.tagName.toLowerCase(), ...classes.map(value => `.${value}`)];
      const variant = current.getAttribute('data-variant');
      const label = current.getAttribute('aria-label');
      if (variant) part.push(`[data-variant="${variant}"]`);
      if (label && /^(etiqueta|label)$/i.test(label)) part.push(`[aria-label="${label}"]`);
      path.unshift(part.join(''));
      current = current.parentElement;
    }
    return path;
  };
  const labelForReport = element => {
    if (/^(INPUT|TEXTAREA|SELECT)$/.test(element.tagName) || element.getAttribute('role') === 'combobox') {
      return reportFieldLabel(controlLabel(element));
    }
    if (element.tagName === 'BUTTON' || element.getAttribute('role') === 'button') return accessibleName(element);
    const variant = element.getAttribute('data-variant');
    if (variant) return reportFieldLabel(variant);
    const own = element.getAttribute('aria-label') || element.getAttribute('title');
    if (own) return normalize(own);
    if (element.tagName === 'LABEL') return normalize(element.innerText || element.textContent);
    const childLabels = [...element.querySelectorAll('input:not([type="file"]),textarea,select')]
      .map(controlLabel).filter(label => label !== 'Campo').map(reportFieldLabel);
    return [...new Set(childLabels)].slice(0, 4).join(' · ');
  };
  const computedCss = element => {
    const style = getComputedStyle(element);
    const values = {};
    for (let index = 0; index < style.length; index += 1) {
      const property = style.item(index);
      values[property] = style.getPropertyValue(property);
    }
    return values;
  };

  const measuredElements = elements.map((element, index) => {
    const rect = element.getBoundingClientRect();
    const style = getComputedStyle(element);
    const attributes = Object.fromEntries(['id', 'class', 'role', 'type', 'name', 'aria-label', 'data-variant']
      .filter(name => element.hasAttribute(name))
      .map(name => [name, element.getAttribute(name)]));
    return {
      index: index + 1,
      kind: elementRole(element),
      tag: element.tagName.toLowerCase(),
      label: labelForReport(element),
      inferredVariant: variantFor(element) || null,
      domPath: domPath(element),
      attributes,
      rect: {
        x: Number(rect.x.toFixed(2)), y: Number(rect.y.toFixed(2)),
        right: Number(rect.right.toFixed(2)), bottom: Number(rect.bottom.toFixed(2)),
        width: Number(rect.width.toFixed(2)), height: Number(rect.height.toFixed(2)), unit: 'px'
      },
      box: {
        width: style.width, height: style.height, margin: style.margin,
        padding: style.padding, boxSizing: style.boxSizing
      },
      inlineStyle: element.getAttribute('style') || '',
      computedCss: computedCss(element)
    };
  });

  const notesControl = allInputs().find(element => canonicalField(controlLabel(element)) === 'notes');
  const endBelowNotes = Boolean(end && notesControl &&
    (notesControl.compareDocumentPosition(end) & Node.DOCUMENT_POSITION_FOLLOWING));
  const repeatableFieldKeys = ['email', 'phone', 'address', 'event', 'website', 'relationship', 'custom'];
  const repeatableChecksRequired = !selectedFields || repeatableFieldKeys.some(field => selectedFields.has(field));
  const dateChecksRequired = !selectedFields || selectedFields.has('event');
  const tests = [
    {
      id: 'range_starts_at_prefix_and_ends_below_notes',
      required: true,
      passed: Boolean(start && end && endBelowNotes && isAfterStart(end)),
      expected: 'Prefijo … Mostrar menos debajo de Notas'
    },
    {
      id: 'important_dates_have_day_month_and_year',
      required: dateChecksRequired,
      passed: !dateChecksRequired || (dateFieldChecks.length === 2 && dateFieldChecks.every(check => check.passed)),
      expectedRows: dateChecksRequired ? 2 : 0,
      checkedRows: dateFieldChecks.length
    },
    {
      id: 'repeatable_rows_have_two_filled_and_one_blank_with_expected_label_visibility',
      required: repeatableChecksRequired,
      passed: !repeatableChecksRequired || (blankRowChecks.length > 0 && blankRowChecks.every(check => check.passed)),
      expectedRowsPerField: 3,
      checkedFields: blankRowChecks.length,
      labelPolicy: isGoogle
        ? 'Google muestra Etiqueta en filas vacías de dirección y fecha importante.'
        : 'Las filas vacías ocultan Etiqueta.'
    },
    {
      id: 'measurement_range_contains_elements',
      required: true,
      passed: measuredElements.length > 0,
      measuredElements: measuredElements.length
    }
  ];
  const failedTests = tests.filter(test => test.required && !test.passed);

  const report = {
    title: 'Checker de layout y CSS',
    testType: 'prueba automatizada del formulario',
    status: failedTests.length ? 'failed' : 'passed',
    platform,
    url: `${location.origin}${location.pathname}`,
    generatedAt: new Date().toISOString(),
    viewport: { width: innerWidth, height: innerHeight, devicePixelRatio },
    range: {
      start: 'Prefijo',
      end: 'Mostrar menos',
      endContext: endBelowNotes ? 'debajo de Notas' : 'no verificado',
      endBelowNotes
    },
    mapping: 'Automático: nombres accesibles/labels, variantes y contenedores visibles del DOM.',
    selectedFields: requestedNames || ['*'],
    tests,
    failedTests,
    dateFieldChecks,
    repeatableBlankRowChecks: blankRowChecks,
    elementCount: measuredElements.length,
    elements: measuredElements
  };
  window.__checkerLayoutLastReport = report;
  const reportJson = JSON.stringify(report, null, 2);
  const blob = new Blob([reportJson], { type: 'application/json;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `checker-layout-${platform}.json`;
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1500);
  console.info(`checker-layout.js: ${elements.length} elementos medidos. Informe JSON:`, report);
  console.info(`JSON descargado como ${link.download}. El contacto de prueba no se ha guardado.`);
  if (failedTests.length) console.error('checker-layout.js: pruebas fallidas:', failedTests);
  return report;
};
