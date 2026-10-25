import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  Menu, Search, CircleHelp, Settings, Grid3X3, Plus, UsersRound, Star,
  Clock3, ContactRound, Tag, ArrowLeft, UserRound, Mail, Phone, Building2,
  CalendarDays, Cake, MapPin, Link2, StickyNote, ChevronDown, Check,
  ImagePlus, X, Trash2, Pencil, Copy, SlidersHorizontal
} from 'lucide-react';
import phoneCountries from './phoneCountries';
import './styles.css';

const sortedPhoneCountries = [...phoneCountries].sort((a, b) => a.name.localeCompare(b.name, 'es'));
const emailTypeOptions = ['Casa', 'Trabajo', 'Otro'];
const phoneTypeOptions = ['Casa', 'Trabajo', 'Otro', 'Móvil', 'Principal', 'Fax particular', 'Fax del trabajo', 'Google Voice', 'Localizador'];
const addressTypeOptions = ['Casa', 'Trabajo', 'Otro'];

function CountryFlag({ country }) {
  return <span className="country-flag" style={{ backgroundPosition: `-1px ${country.spriteY}px` }} aria-hidden="true" />;
}

function PhoneCountryPicker({ value, countryCode, onChange }) {
  const [open, setOpen] = useState(false);
  const selected = phoneCountries.find(country => country.code === countryCode) || phoneCountries.find(country => country.dial === value) || phoneCountries.find(country => country.code === 'es');
  const options = [selected, ...sortedPhoneCountries.filter(country => country.code !== selected.code)];

  return <div className="phone-country-picker" onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}>
    <button type="button" className="country-trigger" aria-label={`Prefijo de llamada: ${selected.name} ${selected.dial}`} aria-haspopup="listbox" aria-expanded={open} title={`${selected.name} (${selected.dial})`} onClick={() => setOpen(value => !value)}>
      <CountryFlag country={selected} /><ChevronDown size={16} />
    </button>
    {open && <div className="country-menu" role="listbox" aria-label="Selecciona un país" onKeyDown={event => { if (event.key === 'Escape') setOpen(false); }}>
      {options.map(country => <button type="button" role="option" aria-selected={country.code === selected.code} className="country-option" key={country.code} onClick={() => { onChange(country); setOpen(false); }}>
        <CountryFlag country={country} /><span>{country.name} ({country.dial})</span>
      </button>)}
    </div>}
  </div>;
}

function Field({ label, value, onChange, type = 'text', placeholder = '', className = '', ...props }) {
  return <div className={`field ${className}`}>
    <input type={type} value={value ?? ''} onChange={event => onChange(event.target.value)} placeholder={placeholder || ' '} aria-label={label} {...props} />
    <label>{label}</label>
  </div>;
}

function TypeLabelAutocomplete({ label = 'Etiqueta', value = '', onChange, options, className = '' }) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef(null);
  const listId = useRef(`type-label-options-${crypto.randomUUID()}`).current;
  const normalizedValue = (value ?? '').trim().toLocaleLowerCase();
  const filteredOptions = options.filter(option => !normalizedValue || option.toLocaleLowerCase().includes(normalizedValue));
  const menuOpen = open && filteredOptions.length > 0;

  const chooseOption = option => {
    onChange(option);
    setOpen(false);
    inputRef.current?.focus();
  };

  const handleKeyDown = event => {
    if (event.key === 'Escape') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      if (!filteredOptions.length) return;
      event.preventDefault();
      const direction = event.key === 'ArrowDown' ? 1 : -1;
      setActiveIndex(index => menuOpen
        ? (index + direction + filteredOptions.length) % filteredOptions.length
        : direction > 0 ? 0 : filteredOptions.length - 1);
      setOpen(true);
    } else if (event.key === 'Enter' && menuOpen && filteredOptions[activeIndex]) {
      event.preventDefault();
      chooseOption(filteredOptions[activeIndex]);
    }
  };

  return <div className={`field type-label-autocomplete ${value ? 'has-value' : ''} ${menuOpen ? 'is-open' : ''} ${className}`.trim()} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}>
    <input
      ref={inputRef}
      type="text"
      value={value ?? ''}
      placeholder={value ?? ''}
      aria-label={label}
      role="combobox"
      aria-haspopup="listbox"
      aria-autocomplete="list"
      aria-controls={menuOpen ? listId : undefined}
      aria-expanded={menuOpen}
      aria-activedescendant={menuOpen ? `${listId}-option-${activeIndex}` : undefined}
      autoComplete="off"
      onFocus={() => { setOpen(true); setActiveIndex(0); }}
      onChange={event => { onChange(event.target.value); setOpen(true); setActiveIndex(0); }}
      onKeyDown={handleKeyDown}
    />
    <label>{label}</label>
    {menuOpen && <div className="type-label-menu" id={listId} role="listbox" aria-label={`${label} sugerencias`}>
      {filteredOptions.map((option, index) => <button
        type="button"
        role="option"
        id={`${listId}-option-${index}`}
        aria-selected={option === value}
        data-active={activeIndex === index}
        className="type-label-option"
        key={option}
        onMouseDown={event => event.preventDefault()}
        onMouseEnter={() => setActiveIndex(index)}
        onClick={() => chooseOption(option)}
      >{option}</button>)}
    </div>}
  </div>;
}

function IconField({ icon: Icon, children, className = '' }) {
  return <div className={`inline-field ${className}`}>
    <div className="field-icon">{Icon && <Icon size={19} strokeWidth={1.7} />}</div>
    {children}
  </div>;
}

function FormAction({ label, onClick, icon: Icon = Plus, variant = 'link', className = '' }) {
  const isPill = variant === 'pill';
  return <button type="button" className={`${isPill ? 'address-add empty-add-pill' : 'add-link'} ${className}`.trim()} onClick={onClick}>
    <Icon size={17} /><span>{label}</span>
  </button>;
}

function RemoveButton({ label, onClick, className = '' }) {
  return <button type="button" className={`remove-field ${className}`.trim()} aria-label={label} title={label} onClick={onClick}><X size={17} /></button>;
}

function RepeatableField({ icon, label, value, onChange, onRemove, removeLabel, type = 'text', className = '', children }) {
  return <div className={`repeatable-field ${className}`.trim()}>
    {children || <IconField icon={icon}><Field label={label} type={type} value={value} onChange={onChange} /></IconField>}
    <RemoveButton label={removeLabel || `Quitar ${label.toLowerCase()}`} onClick={onRemove} />
  </div>;
}

const blankContact = () => ({
  id: crypto.randomUUID(), prefix: '', firstName: '', middleName: '', lastName: '', suffix: '', phoneticFirstName: '', phoneticMiddleName: '', phoneticLastName: '', nickname: '', fileAs: '', company: '', jobTitle: '', department: '',
  email: '', emailType: '', phone: '', phonePrefix: '+34', phoneCountryCode: 'es', phoneType: '', secondPhone: '',
  secondPhoneType: 'Trabajo', birthday: '', website: '', websiteType: '', address: '', addressLine2: '', city: '', province: '', postalCode: '', country: '', poBox: '', addressType: '', notes: '', importantDate: '', relatedPerson: '', customFields: [], extraEmails: [], extraEmailTypes: [], extraPhones: [], extraPhoneTypes: [], extraPhonePrefixes: [], extraPhoneCountryCodes: [], extraImportantDates: [], extraWebsites: [], extraWebsiteTypes: [], extraRelatedPeople: [],
  labels: []
});

const initialContacts = [
  { ...blankContact(), id: '1', firstName: 'María', lastName: 'García', email: 'maria.garcia@example.com', phone: '+34 600 123 456', company: 'Acme', jobTitle: 'Diseñadora' },
  { ...blankContact(), id: '2', firstName: 'Carlos', lastName: 'López', email: 'carlos.lopez@example.com', phone: '+34 611 234 567', company: 'Freelance' },
  { ...blankContact(), id: '3', firstName: 'Lucía', lastName: 'Martín', email: 'lucia.martin@example.com', phone: '+34 622 345 678' },
];

const isNewContactPath = () => /^\/new\/?$/.test(window.location.pathname);
const createNewContactDraft = () => ({ ...blankContact(), extraPhones: [], extraAddresses: [], labels: [] });

function App() {
  const [contacts, setContacts] = useState(() => {
    try { return JSON.parse(localStorage.getItem('contacts-clone-data')) || initialContacts; }
    catch { return initialContacts; }
  });
  const [current, setCurrent] = useState(() => isNewContactPath() ? createNewContactDraft() : null);
  const [query, setQuery] = useState('');
  const [view, setView] = useState(() => isNewContactPath() ? 'editor' : 'contacts');
  const [toast, setToast] = useState('');
  const [showMore, setShowMore] = useState(false);
  const [showNameMore, setShowNameMore] = useState(false);
  const [showOrgMore, setShowOrgMore] = useState(false);
  const [addressVisible, setAddressVisible] = useState(false);
  const [birthdayVisible, setBirthdayVisible] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [labels, setLabels] = useState(() => { try { return JSON.parse(localStorage.getItem('contacts-clone-labels') || '[]'); } catch { return []; } });
  const [showLabels, setShowLabels] = useState(false);
  const [emailVisible, setEmailVisible] = useState(true);
  const [phoneVisible, setPhoneVisible] = useState(true);
  const photoInput = useRef(null);

  useEffect(() => {
    const syncRoute = () => {
      if (isNewContactPath()) {
        setCurrent(createNewContactDraft());
        setView('editor');
        setShowMore(false);
        setShowNameMore(false);
        setShowOrgMore(false);
        setAddressVisible(false);
        setBirthdayVisible(true);
        setShowLabels(false);
        setEmailVisible(true);
        setPhoneVisible(true);
      } else {
        setCurrent(null);
        setView('contacts');
      }
    };
    window.addEventListener('popstate', syncRoute);
    return () => window.removeEventListener('popstate', syncRoute);
  }, []);

  const persist = (next) => {
    setContacts(next);
    localStorage.setItem('contacts-clone-data', JSON.stringify(next));
  };
  const persistLabels = (next) => { setLabels(next); localStorage.setItem('contacts-clone-labels', JSON.stringify(next)); };
  const notify = (message) => {
    setToast(message);
    window.clearTimeout(window.__contactsToast);
    window.__contactsToast = window.setTimeout(() => setToast(''), 2600);
  };
  const openNew = () => { if (!isNewContactPath()) window.history.pushState({ view: 'new' }, '', '/new'); setCurrent(createNewContactDraft()); setShowMore(false); setShowNameMore(false); setShowOrgMore(false); setAddressVisible(false); setBirthdayVisible(true); setShowLabels(false); setEmailVisible(true); setPhoneVisible(true); setView('editor'); };
  const openContacts = () => { if (isNewContactPath()) window.history.replaceState({ view: 'contacts' }, '', '/'); setCurrent(null); setView('contacts'); };
  const openDetail = (contact) => { setCurrent({ ...contact, opened: (contact.opened || 0) + 1 }); setView('detail'); };
  const openEdit = (contact) => { setCurrent({ ...contact }); setShowMore(false); setShowNameMore(false); setShowOrgMore(false); setAddressVisible(!!(contact.address || contact.addressLine2 || contact.city || contact.province || contact.postalCode || contact.country || contact.poBox)); setBirthdayVisible(!!(contact.birthdayDay || contact.birthdayMonth || contact.birthdayYear || contact.birthday)); setShowLabels(false); setEmailVisible(true); setPhoneVisible(!!(contact.phone || contact.secondPhone)); setView('editor'); };
  const save = () => {
    if (!current.firstName.trim() && !current.lastName.trim() && !current.email.trim() && !current.phone.trim()) {
      notify('Añade al menos un nombre, correo o teléfono.');
      return;
    }
    const exists = contacts.some(c => c.id === current.id);
    persist(exists ? contacts.map(c => c.id === current.id ? current : c) : [current, ...contacts]);
    if (isNewContactPath()) window.history.replaceState({ view: 'contacts' }, '', '/');
    setView('contacts'); setCurrent(null); notify(exists ? 'Contacto actualizado' : 'Contacto guardado');
  };
  const remove = () => {
    if (!current) return;
    persist(contacts.filter(c => c.id !== current.id));
    setCurrent(null); setView('contacts'); notify('Contacto eliminado');
  };
  const filtered = useMemo(() => contacts.filter(c => {
    const text = `${c.firstName} ${c.lastName} ${c.email} ${c.phone} ${c.company}`.toLowerCase();
    return text.includes(query.toLowerCase());
  }), [contacts, query]);

  const patch = (key, value) => setCurrent(c => ({ ...c, [key]: value }));
  const addExtraEmail = () => {
    patch('extraEmails', [...(current.extraEmails || []), '']);
    patch('extraEmailTypes', [...(current.extraEmailTypes || []), '']);
  };
  const removeExtraEmail = index => {
    patch('extraEmails', (current.extraEmails || []).filter((_, itemIndex) => itemIndex !== index));
    patch('extraEmailTypes', (current.extraEmailTypes || []).filter((_, itemIndex) => itemIndex !== index));
  };
  const addExtraPhone = () => {
    patch('extraPhones', [...(current.extraPhones || []), '']);
    patch('extraPhoneTypes', [...(current.extraPhoneTypes || []), '']);
    patch('extraPhonePrefixes', [...(current.extraPhonePrefixes || []), current.phonePrefix || '+34']);
    patch('extraPhoneCountryCodes', [...(current.extraPhoneCountryCodes || []), current.phoneCountryCode || 'es']);
  };
  const removeExtraPhone = index => {
    patch('extraPhones', (current.extraPhones || []).filter((_, itemIndex) => itemIndex !== index));
    patch('extraPhoneTypes', (current.extraPhoneTypes || []).filter((_, itemIndex) => itemIndex !== index));
    patch('extraPhonePrefixes', (current.extraPhonePrefixes || []).filter((_, itemIndex) => itemIndex !== index));
    patch('extraPhoneCountryCodes', (current.extraPhoneCountryCodes || []).filter((_, itemIndex) => itemIndex !== index));
  };
  const changeExtraPhoneCountry = (index, country) => {
    const prefixes = [...(current.extraPhonePrefixes || [])];
    const countryCodes = [...(current.extraPhoneCountryCodes || [])];
    prefixes[index] = country.dial;
    countryCodes[index] = country.code;
    patch('extraPhonePrefixes', prefixes);
    patch('extraPhoneCountryCodes', countryCodes);
  };
  const choosePhoto = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { notify('Elige un archivo de imagen.'); return; }
    const reader = new FileReader();
    reader.onload = () => {
      const image = new Image();
      image.onload = () => {
        const scale = Math.min(1, 256 / Math.max(image.width, image.height));
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(image.width * scale); canvas.height = Math.round(image.height * scale);
        canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height);
        patch('photo', canvas.toDataURL('image/jpeg', .82));
      };
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
    event.target.value = '';
  };
  const initials = (c) => `${c.firstName?.[0] || ''}${c.lastName?.[0] || ''}`.toUpperCase() || '?';
  const fullName = (c) => `${c.firstName || ''} ${c.lastName || ''}`.trim() || 'Sin nombre';

  return (
    <div className="app-shell">
      <header className="topbar">
        <button className="icon-button menu-button" aria-label="Abrir menú" onClick={() => setShowMenu(!showMenu)}><Menu /></button>
        <button className="brand" onClick={openContacts} aria-label="Contactos">
          <span className="contacts-logo"><UsersRound size={24} /></span><span>Contactos</span>
        </button>
        <div className="search-box"><Search size={21} /><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Buscar" aria-label="Buscar contactos" />{query && <button onClick={() => setQuery('')} aria-label="Limpiar búsqueda"><X size={18} /></button>}</div>
        <div className="top-actions">
          <button className="icon-button optional" title="Ayuda" onClick={() => notify('Ayuda de Contactos')}><CircleHelp /></button>
          <button className="icon-button optional" title="Configuración" onClick={() => notify('Configuración de demostración')}><Settings /></button>
          <button className="icon-button optional" title="Aplicaciones de Google"><Grid3X3 /></button>
          <div className="account-avatar" title="Perfil">E</div>
        </div>
      </header>

      <div className={`workspace ${view === 'editor' ? 'workspace-editor' : ''}`}>
        <aside className={`sidebar ${showMenu ? 'sidebar-open' : ''}`}>
          <button className="create-button" onClick={openNew}><Plus size={25} /><span>Crear contacto</span></button>
          <nav>
            <button className={`nav-item ${view !== 'editor' && view === 'contacts' ? 'active' : ''}`} onClick={openContacts}><UsersRound /><span>Contactos</span><small>{contacts.length}</small></button>
            <button className="nav-item" onClick={() => { openContacts(); notify('Vista de destacados de demostración'); }}><Star /><span>Destacados</span></button>
            <button className="nav-item" onClick={() => { openContacts(); notify('Vista de frecuentes de demostración'); }}><Clock3 /><span>Frecuentes</span></button>
            <button className="nav-item" onClick={() => { openContacts(); notify('Otros contactos'); }}><ContactRound /><span>Otros contactos</span></button>
          </nav>
          <div className="labels-heading"><span>Etiquetas</span><button title="Crear etiqueta" onClick={() => notify('Crear etiquetas: disponible en una versión ampliada')}><Plus size={18} /></button></div>
          <div className="sidebar-footer">Privacidad · Condiciones</div>
        </aside>

        <main className="main-panel">
          {view === 'detail' && current ? (
            <>
              <div className="page-heading editor-heading detail-heading">
                <button className="icon-button back-button" title="Volver" aria-label="Volver" onClick={openContacts}><ArrowLeft /></button>
                <div className="heading-actions">
                  <button className="icon-button favorite-toggle" aria-label={current.starred ? 'Quitar de favoritos' : 'Añadir a favoritos'} title={current.starred ? 'Quitar de favoritos' : 'Añadir a favoritos'} onClick={() => { const next = { ...current, starred: !current.starred }; setCurrent(next); persist(contacts.map(c => c.id === next.id ? next : c)); }}><Star fill={current.starred ? '#fbbc04' : 'none'} color={current.starred ? '#d89b00' : undefined} /></button>
                  <button className="icon-button" aria-label="Gestionar etiquetas" title="Gestionar etiquetas" onClick={() => { openEdit(current); setShowLabels(true); }}><Tag /></button>
                  <button className="button button-primary" aria-label="Editar contacto" onClick={() => openEdit(current)}><Pencil size={17} /> Editar</button>
                </div>
              </div>
              <section className="contact-detail">
                <div className="detail-profile"><div className="detail-avatar">{current.photo ? <img src={current.photo} alt="" /> : <UserRound size={58} />}</div><div><h1>{fullName(current)}</h1><p>{current.jobTitle}{current.jobTitle && current.company ? ' · ' : ''}{current.company}</p></div></div>
                <div className="detail-section"><h2>Datos de contacto</h2>
                  {[current.email, ...(current.extraEmails || [])].filter(Boolean).map((email, index) => <div className="detail-row" key={`detail-email-${index}`}><Mail /><div><span>Correo electrónico</span><a href={`mailto:${email}`}>{email}</a></div><button className="icon-button" title="Copiar correo" aria-label="Copiar correo" onClick={() => navigator.clipboard?.writeText(email).then(() => notify('Correo copiado'))}><Copy size={17} /></button><a className="icon-button" title="Enviar correo en una ventana nueva" aria-label="Enviar correo en una ventana nueva" href={`mailto:${email}`} target="_blank" rel="noreferrer"><Mail size={17} /></a></div>)}
                  {[current.phone, current.secondPhone, ...(current.extraPhones || [])].filter(Boolean).map((phone, index) => <div className="detail-row" key={`detail-phone-${index}`}><Phone /><div><span>Teléfono</span><a href={`tel:${phone}`}>{phone}</a></div><button className="icon-button" title="Copiar número de teléfono" aria-label="Copiar número de teléfono" onClick={() => navigator.clipboard?.writeText(phone).then(() => notify('Número copiado'))}><Copy size={17} /></button></div>)}
                  {current.address && <div className="detail-row"><MapPin /><div><span>Dirección postal</span><p>{[current.address, current.addressLine2, current.city, current.province, current.postalCode, current.poBox, current.country].filter(Boolean).join(', ')}</p></div></div>}
                </div>
                {(current.birthdayDay || current.birthdayMonth || current.birthdayYear) && <div className="detail-section"><h2>Información adicional</h2><div className="detail-row"><Cake /><div><span>Fecha de nacimiento</span><p>{[current.birthdayDay, current.birthdayMonth, current.birthdayYear].filter(Boolean).join(' ')}</p></div></div></div>}
                {current.notes && <div className="detail-section"><h2>Notas</h2><p>{current.notes}</p></div>}
              </section>
            </>
          ) : view === 'editor' && current ? (
            <>
              <div className="page-heading editor-heading">
                <button className="icon-button back-button" onClick={openContacts} title="Volver"><ArrowLeft /></button>
                <div className="heading-actions">
                  {contacts.some(c => c.id === current.id) && <button className="icon-button" title="Eliminar contacto" onClick={remove}><Trash2 /></button>}
                  <button className="icon-button favorite-toggle" aria-label={current.starred ? 'Quitar de favoritos' : 'Añadir a favoritos'} title={current.starred ? 'Quitar de favoritos' : 'Añadir a favoritos'} onClick={() => patch('starred', !current.starred)}><Star fill={current.starred ? '#fbbc04' : 'none'} color={current.starred ? '#d89b00' : undefined} /></button>
                  <button className="button button-primary" onClick={save} disabled={!current.firstName.trim() && !current.lastName.trim() && !current.email.trim() && !current.phone.trim()}><Check size={17} /> Guardar</button>
                </div>
              </div>
              <div className="contact-form-layout">
                <div className={`contact-profile ${current.firstName || current.middleName || current.lastName ? 'has-contact-name' : ''}`}>
                  <div className="photo-column">
                    <input ref={photoInput} className="photo-input" type="file" accept="image/*" onChange={choosePhoto} aria-label="Elegir foto de contacto" />
                    <button className="photo-placeholder" title="Añadir foto" onClick={() => photoInput.current?.click()}>{current.photo ? <img src={current.photo} alt="" /> : <UserRound size={53} strokeWidth={1.25} />}<span><ImagePlus size={17} /></span></button>
                  </div>
                  <div className="contact-name-preview">{[current.firstName, current.middleName, current.lastName].filter(Boolean).join(' ')}</div>
                </div>
                <div className="profile-toolbar">
                  <button className="manage-labels" onClick={() => setShowLabels(!showLabels)}><Plus size={16} /> Etiqueta</button>
                  {showLabels && <div className="labels-popover">{labels.map(label => <label key={label}><input type="checkbox" checked={(current.labels || []).includes(label)} onChange={e => patch('labels', e.target.checked ? [...(current.labels || []), label] : (current.labels || []).filter(x => x !== label))} />{label}</label>)}<button onClick={() => { const label = window.prompt('Nombre de la etiqueta'); if (label?.trim() && !labels.includes(label.trim())) { persistLabels([...labels, label.trim()]); patch('labels', [...(current.labels || []), label.trim()]); } }}>Crear etiqueta</button></div>}
                </div>
                <section className="contact-form">
                  <div className="name-field-row"><div className="field-icon"><UserRound size={19} strokeWidth={1.7} /></div><div className="field-with-more"><Field label={showNameMore ? 'Prefijo' : 'Nombre'} value={showNameMore ? current.prefix : current.firstName} onChange={v => patch(showNameMore ? 'prefix' : 'firstName', v)} autoFocus /><button className={`inline-expand ${showNameMore ? 'expanded' : ''}`} title={showNameMore ? 'Mostrar menos' : 'Mostrar más'} aria-label={showNameMore ? 'Mostrar menos campos del nombre' : 'Mostrar más campos del nombre'} aria-expanded={showNameMore} onClick={() => setShowNameMore(!showNameMore)}><ChevronDown size={18} /></button></div></div>
                  {showNameMore && <Field className="name-subfield" label="Nombre" value={current.firstName} onChange={v => patch('firstName', v)} />}
                  {showNameMore && <Field className="name-subfield" label="Segundo nombre" value={current.middleName} onChange={v => patch('middleName', v)} />}
                  <Field className="name-subfield" label="Apellidos" value={current.lastName} onChange={v => patch('lastName', v)} />
                  {showNameMore && <>
                    <Field className="name-subfield" label="Sufijo" value={current.suffix} onChange={v => patch('suffix', v)} />
                    <Field className="name-subfield" label="Trascripción fonética del nombre" value={current.phoneticFirstName} onChange={v => patch('phoneticFirstName', v)} />
                    <Field className="name-subfield" label="Segundo nombre fonético" value={current.phoneticMiddleName} onChange={v => patch('phoneticMiddleName', v)} />
                    <Field className="name-subfield" label="Trascripción fonética del apellido" value={current.phoneticLastName} onChange={v => patch('phoneticLastName', v)} />
                    <Field className="name-subfield" label="Apodo" value={current.nickname} onChange={v => patch('nickname', v)} />
                    <Field className="name-subfield" label="Archivar como" value={current.fileAs} onChange={v => patch('fileAs', v)} />
                  </>}
                  <div className="company-field-row"><div className="field-icon"><Building2 size={19} strokeWidth={1.7} /></div><div className="field-with-more"><Field label="Empresa" value={current.company} onChange={v => patch('company', v)} /><button className={`inline-expand ${showOrgMore ? 'expanded' : ''}`} aria-label={showOrgMore ? 'Mostrar menos campos de organización' : 'Mostrar más campos de organización'} aria-expanded={showOrgMore} onClick={() => setShowOrgMore(!showOrgMore)}><ChevronDown size={18} /></button></div></div>
                  <Field className="name-subfield" label="Puesto" value={current.jobTitle} onChange={v => patch('jobTitle', v)} />
                  {showOrgMore && <Field className="name-subfield" label="Departamento" value={current.department} onChange={v => patch('department', v)} />}
                  {contacts.some(contact => contact.id === current.id) && <div className="section-title">Datos de contacto</div>}
                  {emailVisible && (current.email?.trim() || !(current.extraEmails || []).some(email => email?.trim())) && <div className={`contact-method-row email-method ${current.email?.trim() ? 'has-email-label' : ''}`}><IconField icon={Mail}>
                    <Field className="method-value email-value" label="Correo electrónico" type="email" value={current.email} onChange={v => patch('email', v)} />
                    {current.email?.trim() && <TypeLabelAutocomplete className="method-label" value={current.emailType ?? ''} onChange={v => patch('emailType', v)} options={emailTypeOptions} />}
                    <button className="remove-method" aria-label="Quitar dirección de correo electrónico" title="Quitar dirección de correo electrónico" onClick={() => { setEmailVisible(false); patch('email', ''); }}><X size={17} /></button>
                  </IconField></div>}
                  {(current.extraEmails || []).map((email, index) => <RepeatableField key={`email-${index}`} className="contact-method-repeat" icon={Mail} label={`Correo electrónico ${index + 2}`} type="email" value={email} onChange={value => patch('extraEmails', current.extraEmails.map((item, itemIndex) => itemIndex === index ? value : item))} onRemove={() => removeExtraEmail(index)} removeLabel="Quitar correo electrónico">
                    <IconField className="contact-method-inline"><Field className="method-value" label="Correo electrónico" type="email" value={email} onChange={value => patch('extraEmails', current.extraEmails.map((item, itemIndex) => itemIndex === index ? value : item))} />{email?.trim() && <TypeLabelAutocomplete className="method-label" value={current.extraEmailTypes?.[index] ?? ''} onChange={value => patch('extraEmailTypes', (current.extraEmailTypes || []).map((item, itemIndex) => itemIndex === index ? value : item))} options={emailTypeOptions} />}</IconField>
                  </RepeatableField>)}
                  {(emailVisible || (current.extraEmails || []).length > 0)
                    ? <FormAction label="Añadir correo" onClick={() => emailVisible ? addExtraEmail() : setEmailVisible(true)} />
                    : <FormAction label="Añadir correo" icon={Mail} variant="pill" onClick={() => setEmailVisible(true)} />}
                  {phoneVisible && <div className={`contact-method-row phone-method ${current.phone?.trim() ? 'has-phone-label' : ''}`}><IconField icon={Phone}>
                    <PhoneCountryPicker value={current.phonePrefix} countryCode={current.phoneCountryCode} onChange={country => { patch('phonePrefix', country.dial); patch('phoneCountryCode', country.code); }} />
                    <Field className="method-value phone-value" label="Teléfono" type="tel" value={current.phone} onChange={v => patch('phone', v)} />
                    {current.phone?.trim() && <TypeLabelAutocomplete className="method-label" value={current.phoneType ?? ''} onChange={v => patch('phoneType', v)} options={phoneTypeOptions} />}
                    <button className="remove-method" aria-label="Quitar teléfono" title="Quitar teléfono" onClick={() => { setPhoneVisible(false); patch('phone', ''); }}><X size={17} /></button>
                  </IconField></div>}
                  {(current.extraPhones || []).map((phone, index) => <RepeatableField key={`phone-${index}`} className="contact-method-repeat phone-method-repeat" icon={Phone} label={`Teléfono ${index + 2}`} type="tel" value={phone} onChange={value => patch('extraPhones', current.extraPhones.map((item, itemIndex) => itemIndex === index ? value : item))} onRemove={() => removeExtraPhone(index)} removeLabel="Quitar teléfono">
                    <IconField className="contact-method-inline"><PhoneCountryPicker value={current.extraPhonePrefixes?.[index] ?? current.phonePrefix} countryCode={current.extraPhoneCountryCodes?.[index] ?? current.phoneCountryCode} onChange={country => changeExtraPhoneCountry(index, country)} /><Field className="method-value" label="Teléfono" type="tel" value={phone} onChange={value => patch('extraPhones', current.extraPhones.map((item, itemIndex) => itemIndex === index ? value : item))} />{phone?.trim() && <TypeLabelAutocomplete className="method-label" value={current.extraPhoneTypes?.[index] ?? ''} onChange={value => patch('extraPhoneTypes', (current.extraPhoneTypes || []).map((item, itemIndex) => itemIndex === index ? value : item))} options={phoneTypeOptions} />}</IconField>
                  </RepeatableField>)}
                  {(phoneVisible || (current.extraPhones || []).length > 0)
                    ? <FormAction label="Añadir teléfono" onClick={() => phoneVisible ? addExtraPhone() : setPhoneVisible(true)} />
                    : <FormAction label="Añadir teléfono" icon={Phone} variant='pill' onClick={() => setPhoneVisible(true)} />}
                  {addressVisible && <>
                    <div className="country-field"><div className="field-icon"><MapPin size={19} strokeWidth={1.7} /></div><select className="type-select" aria-label="País/territorio" value={current.country || ''} onChange={e => patch('country', e.target.value)}><option value="">País/territorio</option>{['España', 'Estados Unidos', 'Francia', 'Alemania', 'Reino Unido', 'Otro'].map(country => <option key={country}>{country}</option>)}</select></div>
                    <Field className="name-subfield" label="Dirección postal" value={current.address} onChange={v => patch('address', v)} />
                    <Field className="name-subfield" label="Línea de dirección 2" value={current.addressLine2} onChange={v => patch('addressLine2', v)} />
                    <Field className="name-subfield" label="Código postal" value={current.postalCode} onChange={v => patch('postalCode', v)} />
                    <Field className="name-subfield" label="Ciudad" value={current.city} onChange={v => patch('city', v)} />
                    <Field className="name-subfield" label="Provincia" value={current.province} onChange={v => patch('province', v)} />
                    <Field className="name-subfield" label="Apartado postal" value={current.poBox} onChange={v => patch('poBox', v)} />
                    <TypeLabelAutocomplete className="name-subfield" value={current.addressType ?? ''} onChange={v => patch('addressType', v)} options={addressTypeOptions} />
                  </>}
                  {(current.extraAddresses || []).map((addr, index) => (
                    <RepeatableField
                      key={`address-${index}`}
                      icon={MapPin}
                      label={`Dirección ${index + 2}`}
                      onRemove={() => patch('extraAddresses', current.extraAddresses.filter((_, itemIndex) => itemIndex !== index))}
                      removeLabel="Quitar dirección"
                    >
                      <div className="country-field">
                        <div className="field-icon"><MapPin size={19} strokeWidth={1.7} /></div>
                        <select
                          className="type-select"
                          aria-label="País/territorio"
                          value={addr.country || ''}
                          onChange={e => patch('extraAddresses', current.extraAddresses.map((item, itemIndex) => itemIndex === index ? { ...item, country: e.target.value } : item))}
                        >
                          <option value="">País/territorio</option>
                          {['España', 'Estados Unidos', 'Francia', 'Alemania', 'Reino Unido', 'Otro'].map(country => <option key={country}>{country}</option>)}
                        </select>
                      </div>
                      <Field className="name-subfield" label="Dirección postal" value={addr.address || ''} onChange={v => patch('extraAddresses', current.extraAddresses.map((item, itemIndex) => itemIndex === index ? { ...item, address: v } : item))} />
                      <Field className="name-subfield" label="Línea de dirección 2" value={addr.addressLine2 || ''} onChange={v => patch('extraAddresses', current.extraAddresses.map((item, itemIndex) => itemIndex === index ? { ...item, addressLine2: v } : item))} />
                      <Field className="name-subfield" label="Código postal" value={addr.postalCode || ''} onChange={v => patch('extraAddresses', current.extraAddresses.map((item, itemIndex) => itemIndex === index ? { ...item, postalCode: v } : item))} />
                      <Field className="name-subfield" label="Ciudad" value={addr.city || ''} onChange={v => patch('extraAddresses', current.extraAddresses.map((item, itemIndex) => itemIndex === index ? { ...item, city: v } : item))} />
                      <Field className="name-subfield" label="Provincia" value={addr.province || ''} onChange={v => patch('extraAddresses', current.extraAddresses.map((item, itemIndex) => itemIndex === index ? { ...item, province: v } : item))} />
                      <Field className="name-subfield" label="Apartado postal" value={addr.poBox || ''} onChange={v => patch('extraAddresses', current.extraAddresses.map((item, itemIndex) => itemIndex === index ? { ...item, poBox: v } : item))} />
                      {[addr.country, addr.address, addr.addressLine2, addr.postalCode, addr.city, addr.province, addr.poBox].some(value => value?.trim()) && <TypeLabelAutocomplete className="name-subfield" value={addr.addressType ?? ''} onChange={v => patch('extraAddresses', current.extraAddresses.map((item, itemIndex) => itemIndex === index ? { ...item, addressType: v } : item))} options={addressTypeOptions} />}
                    </RepeatableField>
                  ))}
                  {!addressVisible && <FormAction label="Añadir dirección" icon={MapPin} variant="pill" onClick={() => setAddressVisible(true)} />}
                  {addressVisible && <FormAction label="Añadir dirección" onClick={() => patch('extraAddresses', [...(current.extraAddresses || []), ''])} />}
                  {birthdayVisible ? <div className="birthday-row"><IconField icon={Cake} className="birthday-field"><Field label="Día" type="text" value={current.birthdayDay} onChange={v => patch('birthdayDay', v)} /><select className="type-select month-select" value={current.birthdayMonth || ''} onChange={e => patch('birthdayMonth', e.target.value)} aria-label="Mes"><option value="">Mes</option>{['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'].map(m => <option key={m}>{m}</option>)}</select><Field label="Año (opcional)" type="text" value={current.birthdayYear} onChange={v => patch('birthdayYear', v)} /></IconField><RemoveButton className="birthday-remove" label="Quitar fecha de nacimiento" onClick={() => { setBirthdayVisible(false); patch('birthdayDay', ''); patch('birthdayMonth', ''); patch('birthdayYear', ''); patch('birthday', ''); }} /></div> : <FormAction label="Añadir fecha de nacimiento" icon={Cake} variant="pill" onClick={() => setBirthdayVisible(true)} />}
                  <div className={`more-fields ${showMore ? 'is-open' : ''}`} aria-hidden={!showMore}>
                    <div className="more-fields-inner">
                      {(current.extraImportantDates || []).map((date, index) => <div className="repeatable-field important-date-repeat" key={`important-${index}`}>
                        <IconField icon={index === 0 ? CalendarDays : null} className="important-date-field">
                          <Field label="Día" value={date.day} onChange={v => patch('extraImportantDates', current.extraImportantDates.map((x, i) => i === index ? { ...x, day: v } : x))} />
                          <select className="type-select month-select" value={date.month} onChange={e => patch('extraImportantDates', current.extraImportantDates.map((x, i) => i === index ? { ...x, month: e.target.value } : x))} aria-label="Mes"><option value="">Mes</option>{['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'].map(m => <option key={m}>{m}</option>)}</select>
                          <Field label="Año (opcional)" value={date.year} onChange={v => patch('extraImportantDates', current.extraImportantDates.map((x, i) => i === index ? { ...x, year: v } : x))} />
                        </IconField>
                        {(date.day?.trim() || date.month?.trim() || date.year?.trim() || date.label?.trim()) && <div className={`field important-date-label date-label-select ${date.label ? 'has-value' : ''}`}><select value={date.label || ''} aria-label="Etiqueta" onChange={e => patch('extraImportantDates', current.extraImportantDates.map((x, i) => i === index ? { ...x, label: e.target.value } : x))}><option value=""> </option>{date.label && !['Aniversario', 'Otro'].includes(date.label) && <option>{date.label}</option>}<option>Aniversario</option><option>Otro</option></select><label>Etiqueta</label></div>}
                        <RemoveButton label="Quitar fecha importante" onClick={() => patch('extraImportantDates', current.extraImportantDates.filter((_, i) => i !== index))} />
                      </div>)}
                      {(current.extraImportantDates || []).length
                        ? <FormAction label="Añadir fecha importante" onClick={() => patch('extraImportantDates', [...(current.extraImportantDates || []), { day: '', month: '', year: '', label: '' }])} />
                        : <FormAction label="Añadir fecha importante" icon={CalendarDays} variant="pill" onClick={() => patch('extraImportantDates', [{ day: '', month: '', year: '', label: '' }])} />}
                      {current.website?.trim() && <RepeatableField icon={Link2} label="Sitio web" type="url" value={current.website} onChange={value => patch('website', value)} onRemove={() => { patch('website', ''); patch('websiteType', ''); }} removeLabel="Quitar sitio web"><IconField className="contact-method-inline"><Field className="method-value" label="Sitio web" type="url" value={current.website} onChange={value => patch('website', value)} />{current.website?.trim() && <TypeLabelAutocomplete className="method-label" value={current.websiteType ?? ''} onChange={value => patch('websiteType', value)} options={emailTypeOptions} />}</IconField></RepeatableField>}
                      {(current.extraWebsites || []).map((site, index) => <RepeatableField key={`website-${index}`} className="contact-method-repeat" icon={Link2} label={`Sitio web ${index + 1}`} type="url" value={site} onChange={value => patch('extraWebsites', current.extraWebsites.map((item, itemIndex) => itemIndex === index ? value : item))} onRemove={() => { patch('extraWebsites', current.extraWebsites.filter((_, itemIndex) => itemIndex !== index)); patch('extraWebsiteTypes', (current.extraWebsiteTypes || []).filter((_, itemIndex) => itemIndex !== index)); }} removeLabel="Quitar sitio web"><IconField className="contact-method-inline"><Field className="method-value" label="Sitio web" type="url" value={site} onChange={value => patch('extraWebsites', current.extraWebsites.map((item, itemIndex) => itemIndex === index ? value : item))} />{site?.trim() && <TypeLabelAutocomplete className="method-label" value={current.extraWebsiteTypes?.[index] ?? ''} onChange={value => patch('extraWebsiteTypes', Array.from({ length: (current.extraWebsites || []).length }, (_, itemIndex) => itemIndex === index ? value : (current.extraWebsiteTypes || [])[itemIndex] || ''))} options={emailTypeOptions} />}</IconField></RepeatableField>)}
                      {(current.website || (current.extraWebsites || []).length)
                        ? <FormAction label="Añadir sitio web" onClick={() => { patch('extraWebsites', [...(current.extraWebsites || []), '']); patch('extraWebsiteTypes', [...(current.extraWebsiteTypes || []), '']); }} />
                        : <FormAction label="Añadir sitio web" icon={Link2} variant="pill" onClick={() => { patch('extraWebsites', ['']); patch('extraWebsiteTypes', ['']); }} />}
                      {current.relatedPerson && <RepeatableField className="related-repeat" removeLabel="Quitar persona relacionada" onRemove={() => { patch('relatedPerson', ''); patch('relatedPersonType', ''); }}><IconField icon={UserRound} className={`related-field ${current.relatedPerson?.trim() ? 'has-related-label' : 'no-related-label'}`}><Field label="Persona relacionada" value={current.relatedPerson} onChange={v => patch('relatedPerson', v)} />{current.relatedPerson?.trim() && <Field label="Etiqueta" value={current.relatedPersonType || ''} onChange={v => patch('relatedPersonType', v)} />}</IconField></RepeatableField>}
                      {(current.extraRelatedPeople || []).map((person, index) => <RepeatableField key={`related-${index}`} className="related-repeat" removeLabel="Quitar persona relacionada" onRemove={() => patch('extraRelatedPeople', current.extraRelatedPeople.filter((_, itemIndex) => itemIndex !== index))}><IconField icon={!current.relatedPerson && index === 0 ? UserRound : null} className={`related-field ${person.name?.trim() ? 'has-related-label' : 'no-related-label'}`}><Field label="Persona relacionada" value={person.name} onChange={v => patch('extraRelatedPeople', current.extraRelatedPeople.map((item, itemIndex) => itemIndex === index ? { ...item, name: v } : item))} />{person.name?.trim() && <Field label="Etiqueta" value={person.type} onChange={v => patch('extraRelatedPeople', current.extraRelatedPeople.map((item, itemIndex) => itemIndex === index ? { ...item, type: v } : item))} />}</IconField></RepeatableField>)}
                      {(current.relatedPerson || (current.extraRelatedPeople || []).length)
                        ? <FormAction label="Añadir persona relacionada" onClick={() => patch('extraRelatedPeople', [...(current.extraRelatedPeople || []), { name: '', type: '' }])} />
                        : <FormAction label="Añadir persona relacionada" icon={UserRound} variant="pill" onClick={() => patch('extraRelatedPeople', [{ name: '', type: '' }])} />}
                      {(current.customFields || []).map((item, index) => (
                        <RepeatableField
                          key={`custom-${index}`}
                          className="custom-field-row"
                          removeLabel="Quitar campo personalizado"
                          onRemove={() => patch('customFields', current.customFields.filter((_, itemIndex) => itemIndex !== index))}
                        >
                          <IconField icon={index === 0 ? SlidersHorizontal : null} className="contact-method-inline">
                            <Field
                              className="method-value"
                              label="Campo personalizado"
                              value={item.label}
                              onChange={value => patch('customFields', current.customFields.map((entry, itemIndex) => itemIndex === index ? { ...entry, label: value } : entry))}
                            />
                            {item.label?.trim() && (
                              <Field
                                className="method-label"
                                label="Etiqueta"
                                value={item.value}
                                onChange={value => patch('customFields', current.customFields.map((entry, itemIndex) => itemIndex === index ? { ...entry, value } : entry))}
                              />
                            )}
                          </IconField>
                        </RepeatableField>
                      ))}

                      {(current.customFields || []).length > 0 ? (
                        <FormAction
                          label="Añadir campo personalizado"
                          onClick={() => patch('customFields', [...(current.customFields || []), { label: '', value: '' }])}
                        />
                      ) : (
                        <FormAction
                          label="Añadir campo personalizado"
                          icon={SlidersHorizontal}
                          variant="pill"
                          onClick={() => patch('customFields', [{ label: '', value: '' }])}
                        />
                      )}
                    </div>
                  </div>
                  <IconField icon={StickyNote} className="notes-field"><div className="field"><textarea value={current.notes} onChange={e => patch('notes', e.target.value)} aria-label="Notas" placeholder=" " rows="3" /><label>Notas</label></div></IconField>
                  <button className={`more-fields-toggle ${showMore ? 'expanded' : ''}`} aria-expanded={showMore} onClick={() => setShowMore(!showMore)}><ChevronDown size={18} /><span>{showMore ? 'Mostrar menos' : 'Mostrar más'}</span></button>
                  <div className="form-bottom-actions"><button className="button button-outline" onClick={openContacts}>Cancelar</button><button className="button button-primary" onClick={save}><Check size={17} /> Guardar</button></div>
                </section>
              </div>
            </>
          ) : (
            <>
              <div className="list-heading"><div><h1>Contactos</h1><p>{filtered.length} contactos</p></div><div className="list-actions"><button className="icon-button" title="Filtrar" onClick={() => notify('Filtros de demostración')}><SlidersHorizontal /></button><button className="button button-primary" onClick={openNew}><Plus size={18} /> Crear contacto</button></div></div>
              <div className="table-wrap">
                <div className="table-head"><span>Nombre</span><span>Correo electrónico</span><span>Teléfono</span><span>Puesto y empresa</span><span></span></div>
                {filtered.length ? filtered.map(c => <button className="contact-row" key={c.id} onClick={() => openDetail(c)}>
                  <span className="person-cell"><span className={`person-avatar avatar-${(c.firstName.charCodeAt(0) || 1) % 5}`}>{initials(c)}</span><span>{fullName(c)}</span></span>
                  <span className="muted-cell">{c.email || '—'}</span><span className="muted-cell">{c.phone || '—'}</span><span className="muted-cell">{[c.jobTitle, c.company].filter(Boolean).join(' · ') || '—'}</span><span><Pencil size={16} /></span>
                </button>) : <div className="empty-state"><UsersRound size={42} /><h2>No se encontraron contactos</h2><p>Prueba otra búsqueda o crea un contacto nuevo.</p><button className="button button-primary" onClick={openNew}><Plus size={18} /> Crear contacto</button></div>}
              </div>
              <div className="list-footer">Haz clic en un contacto para ver o editar sus datos.</div>
            </>
          )}
        </main>
      </div>
      {toast && <div className="toast" role="status">{toast}</div>}
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
