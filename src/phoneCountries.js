const phoneCountries = [
  {
    "code": "es",
    "name": "España",
    "dial": "+34",
    "spriteY": -1480
  },
  {
    "code": "af",
    "name": "Afganistán",
    "dial": "+93",
    "spriteY": -3163
  },
  {
    "code": "al",
    "name": "Albania",
    "dial": "+355",
    "spriteY": -1310
  },
  {
    "code": "de",
    "name": "Alemania",
    "dial": "+49",
    "spriteY": -3435
  },
  {
    "code": "ad",
    "name": "Andorra",
    "dial": "+376",
    "spriteY": -766
  },
  {
    "code": "ao",
    "name": "Angola",
    "dial": "+244",
    "spriteY": -2619
  },
  {
    "code": "ai",
    "name": "Anguila",
    "dial": "+1",
    "spriteY": -2670
  },
  {
    "code": "ag",
    "name": "Antigua y Barbuda",
    "dial": "+1",
    "spriteY": -1140
  },
  {
    "code": "sa",
    "name": "Arabia Saudí",
    "dial": "+966",
    "spriteY": -52
  },
  {
    "code": "dz",
    "name": "Argelia",
    "dial": "+213",
    "spriteY": -681
  },
  {
    "code": "ar",
    "name": "Argentina",
    "dial": "+54",
    "spriteY": -3265
  },
  {
    "code": "am",
    "name": "Armenia",
    "dial": "+374",
    "spriteY": -205
  },
  {
    "code": "aw",
    "name": "Aruba",
    "dial": "+297",
    "spriteY": -1021
  },
  {
    "code": "au",
    "name": "Australia",
    "dial": "+61",
    "spriteY": -2262
  },
  {
    "code": "at",
    "name": "Austria",
    "dial": "+43",
    "spriteY": -1718
  },
  {
    "code": "az",
    "name": "Azerbaiyán",
    "dial": "+994",
    "spriteY": -1599
  },
  {
    "code": "bs",
    "name": "Bahamas",
    "dial": "+1",
    "spriteY": -460
  },
  {
    "code": "bd",
    "name": "Bangladés",
    "dial": "+880",
    "spriteY": -2347
  },
  {
    "code": "bb",
    "name": "Barbados",
    "dial": "+1",
    "spriteY": -2058
  },
  {
    "code": "bh",
    "name": "Baréin",
    "dial": "+973",
    "spriteY": -1939
  },
  {
    "code": "be",
    "name": "Bélgica",
    "dial": "+32",
    "spriteY": -1
  },
  {
    "code": "bz",
    "name": "Belice",
    "dial": "+501",
    "spriteY": -613
  },
  {
    "code": "bj",
    "name": "Benín",
    "dial": "+229",
    "spriteY": -1667
  },
  {
    "code": "bm",
    "name": "Bermudas",
    "dial": "+1",
    "spriteY": -2568
  },
  {
    "code": "by",
    "name": "Bielorrusia",
    "dial": "+375",
    "spriteY": -1412
  },
  {
    "code": "bo",
    "name": "Bolivia",
    "dial": "+591",
    "spriteY": -2160
  },
  {
    "code": "ba",
    "name": "Bosnia y Herzegovina",
    "dial": "+387",
    "spriteY": -2075
  },
  {
    "code": "bw",
    "name": "Botsuana",
    "dial": "+267",
    "spriteY": -3707
  },
  {
    "code": "br",
    "name": "Brasil",
    "dial": "+55",
    "spriteY": -1004
  },
  {
    "code": "bn",
    "name": "Brunéi",
    "dial": "+673",
    "spriteY": -2211
  },
  {
    "code": "bg",
    "name": "Bulgaria",
    "dial": "+359",
    "spriteY": -3520
  },
  {
    "code": "bf",
    "name": "Burkina Faso",
    "dial": "+226",
    "spriteY": -953
  },
  {
    "code": "bi",
    "name": "Burundi",
    "dial": "+257",
    "spriteY": -2534
  },
  {
    "code": "bt",
    "name": "Bután",
    "dial": "+975",
    "spriteY": -2466
  },
  {
    "code": "cv",
    "name": "Cabo Verde",
    "dial": "+238",
    "spriteY": -3622
  },
  {
    "code": "kh",
    "name": "Camboya",
    "dial": "+855",
    "spriteY": -290
  },
  {
    "code": "cm",
    "name": "Camerún",
    "dial": "+237",
    "spriteY": -2789
  },
  {
    "code": "ca",
    "name": "Canadá",
    "dial": "+1",
    "spriteY": -1786
  },
  {
    "code": "bq",
    "name": "Caribe neerlandés",
    "dial": "+599",
    "spriteY": -3724
  },
  {
    "code": "qa",
    "name": "Catar",
    "dial": "+974",
    "spriteY": -579
  },
  {
    "code": "td",
    "name": "Chad",
    "dial": "+235",
    "spriteY": -1055
  },
  {
    "code": "cz",
    "name": "Chequia",
    "dial": "+420",
    "spriteY": -3078
  },
  {
    "code": "cl",
    "name": "Chile",
    "dial": "+56",
    "spriteY": -1735
  },
  {
    "code": "cn",
    "name": "China",
    "dial": "+86",
    "spriteY": -1072
  },
  {
    "code": "cy",
    "name": "Chipre",
    "dial": "+357",
    "spriteY": -732
  },
  {
    "code": "va",
    "name": "Ciudad del Vaticano",
    "dial": "+39",
    "spriteY": -3180
  },
  {
    "code": "co",
    "name": "Colombia",
    "dial": "+57",
    "spriteY": -409
  },
  {
    "code": "km",
    "name": "Comoras",
    "dial": "+269",
    "spriteY": -1854
  },
  {
    "code": "cg",
    "name": "Congo",
    "dial": "+242",
    "spriteY": -2381
  },
  {
    "code": "kp",
    "name": "Corea del Norte",
    "dial": "+850",
    "spriteY": -2398
  },
  {
    "code": "kr",
    "name": "Corea del Sur",
    "dial": "+82",
    "spriteY": -3061
  },
  {
    "code": "cr",
    "name": "Costa Rica",
    "dial": "+506",
    "spriteY": -2840
  },
  {
    "code": "ci",
    "name": "Côte d’Ivoire",
    "dial": "+225",
    "spriteY": -2177
  },
  {
    "code": "hr",
    "name": "Croacia",
    "dial": "+385",
    "spriteY": -1174
  },
  {
    "code": "cu",
    "name": "Cuba",
    "dial": "+53",
    "spriteY": -987
  },
  {
    "code": "cw",
    "name": "Curazao",
    "dial": "+599",
    "spriteY": -3741
  },
  {
    "code": "dk",
    "name": "Dinamarca",
    "dial": "+45",
    "spriteY": -1803
  },
  {
    "code": "dm",
    "name": "Dominica",
    "dial": "+1",
    "spriteY": -3333
  },
  {
    "code": "ec",
    "name": "Ecuador",
    "dial": "+593",
    "spriteY": -1531
  },
  {
    "code": "eg",
    "name": "Egipto",
    "dial": "+20",
    "spriteY": -3010
  },
  {
    "code": "sv",
    "name": "El Salvador",
    "dial": "+503",
    "spriteY": -2143
  },
  {
    "code": "ae",
    "name": "Emiratos Árabes Unidos",
    "dial": "+971",
    "spriteY": -3044
  },
  {
    "code": "er",
    "name": "Eritrea",
    "dial": "+291",
    "spriteY": -936
  },
  {
    "code": "sk",
    "name": "Eslovaquia",
    "dial": "+421",
    "spriteY": -3027
  },
  {
    "code": "si",
    "name": "Eslovenia",
    "dial": "+386",
    "spriteY": -1582
  },
  {
    "code": "es",
    "name": "España",
    "dial": "+34",
    "spriteY": -1480
  },
  {
    "code": "us",
    "name": "Estados Unidos",
    "dial": "+1",
    "spriteY": -69
  },
  {
    "code": "ee",
    "name": "Estonia",
    "dial": "+372",
    "spriteY": -3316
  },
  {
    "code": "sz",
    "name": "Esuatini",
    "dial": "+268",
    "spriteY": -3112
  },
  {
    "code": "et",
    "name": "Etiopía",
    "dial": "+251",
    "spriteY": -3350
  },
  {
    "code": "ph",
    "name": "Filipinas",
    "dial": "+63",
    "spriteY": -2415
  },
  {
    "code": "fi",
    "name": "Finlandia",
    "dial": "+358",
    "spriteY": -2551
  },
  {
    "code": "fj",
    "name": "Fiyi",
    "dial": "+679",
    "spriteY": -2483
  },
  {
    "code": "fr",
    "name": "Francia",
    "dial": "+33",
    "spriteY": -324
  },
  {
    "code": "ga",
    "name": "Gabón",
    "dial": "+241",
    "spriteY": -1157
  },
  {
    "code": "gm",
    "name": "Gambia",
    "dial": "+220",
    "spriteY": -817
  },
  {
    "code": "ge",
    "name": "Georgia",
    "dial": "+995",
    "spriteY": -1123
  },
  {
    "code": "gh",
    "name": "Ghana",
    "dial": "+233",
    "spriteY": -2874
  },
  {
    "code": "gi",
    "name": "Gibraltar",
    "dial": "+350",
    "spriteY": -341
  },
  {
    "code": "gd",
    "name": "Granada",
    "dial": "+1",
    "spriteY": -3299
  },
  {
    "code": "gr",
    "name": "Grecia",
    "dial": "+30",
    "spriteY": -188
  },
  {
    "code": "gl",
    "name": "Groenlandia",
    "dial": "+299",
    "spriteY": -2330
  },
  {
    "code": "gp",
    "name": "Guadalupe",
    "dial": "+590",
    "spriteY": -511
  },
  {
    "code": "gu",
    "name": "Guam",
    "dial": "+1",
    "spriteY": -3248
  },
  {
    "code": "gt",
    "name": "Guatemala",
    "dial": "+502",
    "spriteY": -1208
  },
  {
    "code": "gf",
    "name": "Guayana Francesa",
    "dial": "+594",
    "spriteY": -324
  },
  {
    "code": "gg",
    "name": "Guernesey",
    "dial": "+44",
    "spriteY": -3860
  },
  {
    "code": "gn",
    "name": "Guinea",
    "dial": "+224",
    "spriteY": -3503
  },
  {
    "code": "gq",
    "name": "Guinea Ecuatorial",
    "dial": "+240",
    "spriteY": -1956
  },
  {
    "code": "gw",
    "name": "Guinea-Bisáu",
    "dial": "+245",
    "spriteY": -2585
  },
  {
    "code": "gy",
    "name": "Guyana",
    "dial": "+592",
    "spriteY": -1038
  },
  {
    "code": "ht",
    "name": "Haití",
    "dial": "+509",
    "spriteY": -392
  },
  {
    "code": "hn",
    "name": "Honduras",
    "dial": "+504",
    "spriteY": -2942
  },
  {
    "code": "hk",
    "name": "Hong Kong",
    "dial": "+852",
    "spriteY": -3690
  },
  {
    "code": "hu",
    "name": "Hungría",
    "dial": "+36",
    "spriteY": -902
  },
  {
    "code": "in",
    "name": "India",
    "dial": "+91",
    "spriteY": -2228
  },
  {
    "code": "id",
    "name": "Indonesia",
    "dial": "+62",
    "spriteY": -2636
  },
  {
    "code": "iq",
    "name": "Irak",
    "dial": "+964",
    "spriteY": -851
  },
  {
    "code": "ir",
    "name": "Irán",
    "dial": "+98",
    "spriteY": -2721
  },
  {
    "code": "ie",
    "name": "Irlanda",
    "dial": "+353",
    "spriteY": -2653
  },
  {
    "code": "ac",
    "name": "Isla de la Ascensión",
    "dial": "+247",
    "spriteY": -86
  },
  {
    "code": "im",
    "name": "Isla de Man",
    "dial": "+44",
    "spriteY": -3877
  },
  {
    "code": "cx",
    "name": "Isla de Navidad",
    "dial": "+61",
    "spriteY": -3928
  },
  {
    "code": "nf",
    "name": "Isla Norfolk",
    "dial": "+672",
    "spriteY": -256
  },
  {
    "code": "is",
    "name": "Islandia",
    "dial": "+354",
    "spriteY": -2687
  },
  {
    "code": "ax",
    "name": "Islas Aland",
    "dial": "+358",
    "spriteY": -3979
  },
  {
    "code": "ky",
    "name": "Islas Caimán",
    "dial": "+1",
    "spriteY": -375
  },
  {
    "code": "cc",
    "name": "Islas Cocos",
    "dial": "+61",
    "spriteY": -3911
  },
  {
    "code": "ck",
    "name": "Islas Cook",
    "dial": "+682",
    "spriteY": -3095
  },
  {
    "code": "fo",
    "name": "Islas Feroe",
    "dial": "+298",
    "spriteY": -1429
  },
  {
    "code": "fk",
    "name": "Islas Malvinas (Islas Falkland)",
    "dial": "+500",
    "spriteY": -3792
  },
  {
    "code": "mp",
    "name": "Islas Marianas del Norte",
    "dial": "+1",
    "spriteY": -919
  },
  {
    "code": "mh",
    "name": "Islas Marshall",
    "dial": "+692",
    "spriteY": -1463
  },
  {
    "code": "sb",
    "name": "Islas Salomón",
    "dial": "+677",
    "spriteY": -1361
  },
  {
    "code": "tc",
    "name": "Islas Turcas y Caicos",
    "dial": "+1",
    "spriteY": -1684
  },
  {
    "code": "vg",
    "name": "Islas Vírgenes Británicas",
    "dial": "+1",
    "spriteY": -1837
  },
  {
    "code": "vi",
    "name": "Islas Vírgenes de EE. UU.",
    "dial": "+1",
    "spriteY": -2364
  },
  {
    "code": "il",
    "name": "Israel",
    "dial": "+972",
    "spriteY": -426
  },
  {
    "code": "it",
    "name": "Italia",
    "dial": "+39",
    "spriteY": -154
  },
  {
    "code": "jm",
    "name": "Jamaica",
    "dial": "+1",
    "spriteY": -2279
  },
  {
    "code": "jp",
    "name": "Japón",
    "dial": "+81",
    "spriteY": -528
  },
  {
    "code": "je",
    "name": "Jersey",
    "dial": "+44",
    "spriteY": -3894
  },
  {
    "code": "jo",
    "name": "Jordania",
    "dial": "+962",
    "spriteY": -1888
  },
  {
    "code": "kz",
    "name": "Kazajistán",
    "dial": "+7",
    "spriteY": -1565
  },
  {
    "code": "ke",
    "name": "Kenia",
    "dial": "+254",
    "spriteY": -3588
  },
  {
    "code": "kg",
    "name": "Kirguistán",
    "dial": "+996",
    "spriteY": -2126
  },
  {
    "code": "ki",
    "name": "Kiribati",
    "dial": "+686",
    "spriteY": -477
  },
  {
    "code": "xk",
    "name": "Kosovo",
    "dial": "+383",
    "spriteY": -3843
  },
  {
    "code": "kw",
    "name": "Kuwait",
    "dial": "+965",
    "spriteY": -3418
  },
  {
    "code": "la",
    "name": "Laos",
    "dial": "+856",
    "spriteY": -562
  },
  {
    "code": "ls",
    "name": "Lesoto",
    "dial": "+266",
    "spriteY": -2993
  },
  {
    "code": "lv",
    "name": "Letonia",
    "dial": "+371",
    "spriteY": -2602
  },
  {
    "code": "lb",
    "name": "Líbano",
    "dial": "+961",
    "spriteY": -1616
  },
  {
    "code": "lr",
    "name": "Liberia",
    "dial": "+231",
    "spriteY": -2806
  },
  {
    "code": "ly",
    "name": "Libia",
    "dial": "+218",
    "spriteY": -137
  },
  {
    "code": "li",
    "name": "Liechtenstein",
    "dial": "+423",
    "spriteY": -1276
  },
  {
    "code": "lt",
    "name": "Lituania",
    "dial": "+370",
    "spriteY": -1446
  },
  {
    "code": "lu",
    "name": "Luxemburgo",
    "dial": "+352",
    "spriteY": -1905
  },
  {
    "code": "mo",
    "name": "Macao",
    "dial": "+853",
    "spriteY": -3537
  },
  {
    "code": "mk",
    "name": "Macedonia del Norte",
    "dial": "+389",
    "spriteY": -1752
  },
  {
    "code": "mg",
    "name": "Madagascar",
    "dial": "+261",
    "spriteY": -1650
  },
  {
    "code": "my",
    "name": "Malasia",
    "dial": "+60",
    "spriteY": -2500
  },
  {
    "code": "mw",
    "name": "Malaui",
    "dial": "+265",
    "spriteY": -2925
  },
  {
    "code": "mv",
    "name": "Maldivas",
    "dial": "+960",
    "spriteY": -800
  },
  {
    "code": "ml",
    "name": "Mali",
    "dial": "+223",
    "spriteY": -3452
  },
  {
    "code": "mt",
    "name": "Malta",
    "dial": "+356",
    "spriteY": -2024
  },
  {
    "code": "ma",
    "name": "Marruecos",
    "dial": "+212",
    "spriteY": -3197
  },
  {
    "code": "mq",
    "name": "Martinica",
    "dial": "+596",
    "spriteY": -239
  },
  {
    "code": "mu",
    "name": "Mauricio",
    "dial": "+230",
    "spriteY": -2976
  },
  {
    "code": "mr",
    "name": "Mauritania",
    "dial": "+222",
    "spriteY": -307
  },
  {
    "code": "yt",
    "name": "Mayotte",
    "dial": "+262",
    "spriteY": -324
  },
  {
    "code": "mx",
    "name": "México",
    "dial": "+52",
    "spriteY": -2738
  },
  {
    "code": "fm",
    "name": "Micronesia",
    "dial": "+691",
    "spriteY": -2296
  },
  {
    "code": "md",
    "name": "Moldavia",
    "dial": "+373",
    "spriteY": -3673
  },
  {
    "code": "mc",
    "name": "Mónaco",
    "dial": "+377",
    "spriteY": -1191
  },
  {
    "code": "mn",
    "name": "Mongolia",
    "dial": "+976",
    "spriteY": -3486
  },
  {
    "code": "me",
    "name": "Montenegro",
    "dial": "+382",
    "spriteY": -2959
  },
  {
    "code": "ms",
    "name": "Montserrat",
    "dial": "+1",
    "spriteY": -749
  },
  {
    "code": "mz",
    "name": "Mozambique",
    "dial": "+258",
    "spriteY": -834
  },
  {
    "code": "mm",
    "name": "Myanmar (Birmania)",
    "dial": "+95",
    "spriteY": -18
  },
  {
    "code": "na",
    "name": "Namibia",
    "dial": "+264",
    "spriteY": -2517
  },
  {
    "code": "nr",
    "name": "Nauru",
    "dial": "+674",
    "spriteY": -2313
  },
  {
    "code": "np",
    "name": "Nepal",
    "dial": "+977",
    "spriteY": -120
  },
  {
    "code": "ni",
    "name": "Nicaragua",
    "dial": "+505",
    "spriteY": -171
  },
  {
    "code": "ne",
    "name": "Níger",
    "dial": "+227",
    "spriteY": -715
  },
  {
    "code": "ng",
    "name": "Nigeria",
    "dial": "+234",
    "spriteY": -3401
  },
  {
    "code": "nu",
    "name": "Niue",
    "dial": "+683",
    "spriteY": -2823
  },
  {
    "code": "no",
    "name": "Noruega",
    "dial": "+47",
    "spriteY": -1089
  },
  {
    "code": "nc",
    "name": "Nueva Caledonia",
    "dial": "+687",
    "spriteY": -324
  },
  {
    "code": "nz",
    "name": "Nueva Zelanda",
    "dial": "+64",
    "spriteY": -2007
  },
  {
    "code": "om",
    "name": "Omán",
    "dial": "+968",
    "spriteY": -3367
  },
  {
    "code": "nl",
    "name": "Países Bajos",
    "dial": "+31",
    "spriteY": -1871
  },
  {
    "code": "pk",
    "name": "Pakistán",
    "dial": "+92",
    "spriteY": -2755
  },
  {
    "code": "pw",
    "name": "Palaos",
    "dial": "+680",
    "spriteY": -273
  },
  {
    "code": "ps",
    "name": "Palestina",
    "dial": "+970",
    "spriteY": -1548
  },
  {
    "code": "pa",
    "name": "Panamá",
    "dial": "+507",
    "spriteY": -1106
  },
  {
    "code": "pg",
    "name": "Papúa Nueva Guinea",
    "dial": "+675",
    "spriteY": -1922
  },
  {
    "code": "py",
    "name": "Paraguay",
    "dial": "+595",
    "spriteY": -3214
  },
  {
    "code": "pe",
    "name": "Perú",
    "dial": "+51",
    "spriteY": -1225
  },
  {
    "code": "pf",
    "name": "Polinesia Francesa",
    "dial": "+689",
    "spriteY": -2245
  },
  {
    "code": "pl",
    "name": "Polonia",
    "dial": "+48",
    "spriteY": -1514
  },
  {
    "code": "pt",
    "name": "Portugal",
    "dial": "+351",
    "spriteY": -664
  },
  {
    "code": "pr",
    "name": "Puerto Rico",
    "dial": "+1",
    "spriteY": -596
  },
  {
    "code": "gb",
    "name": "Reino Unido",
    "dial": "+44",
    "spriteY": -86
  },
  {
    "code": "cf",
    "name": "República Centroafricana",
    "dial": "+236",
    "spriteY": -2449
  },
  {
    "code": "cd",
    "name": "República Democrática del Congo",
    "dial": "+243",
    "spriteY": -1973
  },
  {
    "code": "do",
    "name": "República Dominicana",
    "dial": "+1",
    "spriteY": -1990
  },
  {
    "code": "re",
    "name": "Reunión",
    "dial": "+262",
    "spriteY": -324
  },
  {
    "code": "rw",
    "name": "Ruanda",
    "dial": "+250",
    "spriteY": -3656
  },
  {
    "code": "ro",
    "name": "Rumanía",
    "dial": "+40",
    "spriteY": -885
  },
  {
    "code": "ru",
    "name": "Rusia",
    "dial": "+7",
    "spriteY": -868
  },
  {
    "code": "eh",
    "name": "Sáhara Occidental",
    "dial": "+212",
    "spriteY": -3945
  },
  {
    "code": "ws",
    "name": "Samoa",
    "dial": "+685",
    "spriteY": -3146
  },
  {
    "code": "as",
    "name": "Samoa Americana",
    "dial": "+1",
    "spriteY": -2041
  },
  {
    "code": "bl",
    "name": "San Bartolomé",
    "dial": "+590",
    "spriteY": -324
  },
  {
    "code": "kn",
    "name": "San Cristóbal y Nieves",
    "dial": "+1",
    "spriteY": -103
  },
  {
    "code": "sm",
    "name": "San Marino",
    "dial": "+378",
    "spriteY": -2891
  },
  {
    "code": "mf",
    "name": "San Martín",
    "dial": "+590",
    "spriteY": -86
  },
  {
    "code": "pm",
    "name": "San Pedro y Miquelón",
    "dial": "+508",
    "spriteY": -1378
  },
  {
    "code": "vc",
    "name": "San Vicente y las Granadinas",
    "dial": "+1",
    "spriteY": -3571
  },
  {
    "code": "sh",
    "name": "Santa Elena",
    "dial": "+290",
    "spriteY": -630
  },
  {
    "code": "lc",
    "name": "Santa Lucía",
    "dial": "+1",
    "spriteY": -1820
  },
  {
    "code": "st",
    "name": "Santo Tomé y Príncipe",
    "dial": "+239",
    "spriteY": -3282
  },
  {
    "code": "sn",
    "name": "Senegal",
    "dial": "+221",
    "spriteY": -2908
  },
  {
    "code": "rs",
    "name": "Serbia",
    "dial": "+381",
    "spriteY": -3384
  },
  {
    "code": "sc",
    "name": "Seychelles",
    "dial": "+248",
    "spriteY": -1327
  },
  {
    "code": "sl",
    "name": "Sierra Leona",
    "dial": "+232",
    "spriteY": -970
  },
  {
    "code": "sg",
    "name": "Singapur",
    "dial": "+65",
    "spriteY": -35
  },
  {
    "code": "sx",
    "name": "Sint Maarten",
    "dial": "+1",
    "spriteY": -3809
  },
  {
    "code": "sy",
    "name": "Siria",
    "dial": "+963",
    "spriteY": -2432
  },
  {
    "code": "so",
    "name": "Somalia",
    "dial": "+252",
    "spriteY": -1769
  },
  {
    "code": "lk",
    "name": "Sri Lanka",
    "dial": "+94",
    "spriteY": -3605
  },
  {
    "code": "za",
    "name": "Sudáfrica",
    "dial": "+27",
    "spriteY": -3231
  },
  {
    "code": "sd",
    "name": "Sudán",
    "dial": "+249",
    "spriteY": -443
  },
  {
    "code": "ss",
    "name": "Sudán del Sur",
    "dial": "+211",
    "spriteY": -3758
  },
  {
    "code": "se",
    "name": "Suecia",
    "dial": "+46",
    "spriteY": -494
  },
  {
    "code": "ch",
    "name": "Suiza",
    "dial": "+41",
    "spriteY": -1701
  },
  {
    "code": "sr",
    "name": "Surinam",
    "dial": "+597",
    "spriteY": -3639
  },
  {
    "code": "sj",
    "name": "Svalbard y Jan Mayen",
    "dial": "+47",
    "spriteY": -1089
  },
  {
    "code": "th",
    "name": "Tailandia",
    "dial": "+66",
    "spriteY": -1242
  },
  {
    "code": "tw",
    "name": "Taiwán",
    "dial": "+886",
    "spriteY": -647
  },
  {
    "code": "tz",
    "name": "Tanzania",
    "dial": "+255",
    "spriteY": -3129
  },
  {
    "code": "tj",
    "name": "Tayikistán",
    "dial": "+992",
    "spriteY": -222
  },
  {
    "code": "io",
    "name": "Territorio Británico del Océano Índico",
    "dial": "+246",
    "spriteY": -86
  },
  {
    "code": "tl",
    "name": "Timor-Leste",
    "dial": "+670",
    "spriteY": -3826
  },
  {
    "code": "tg",
    "name": "Togo",
    "dial": "+228",
    "spriteY": -783
  },
  {
    "code": "tk",
    "name": "Tokelau",
    "dial": "+690",
    "spriteY": -3775
  },
  {
    "code": "to",
    "name": "Tonga",
    "dial": "+676",
    "spriteY": -1395
  },
  {
    "code": "tt",
    "name": "Trinidad y Tobago",
    "dial": "+1",
    "spriteY": -545
  },
  {
    "code": "ta",
    "name": "Tristán de Acuña",
    "dial": "+290",
    "spriteY": -3962
  },
  {
    "code": "tn",
    "name": "Túnez",
    "dial": "+216",
    "spriteY": -698
  },
  {
    "code": "tm",
    "name": "Turkmenistán",
    "dial": "+993",
    "spriteY": -3469
  },
  {
    "code": "tr",
    "name": "Turquía",
    "dial": "+90",
    "spriteY": -2109
  },
  {
    "code": "tv",
    "name": "Tuvalu",
    "dial": "+688",
    "spriteY": -358
  },
  {
    "code": "ua",
    "name": "Ucrania",
    "dial": "+380",
    "spriteY": -2704
  },
  {
    "code": "ug",
    "name": "Uganda",
    "dial": "+256",
    "spriteY": -1497
  },
  {
    "code": "uy",
    "name": "Uruguay",
    "dial": "+598",
    "spriteY": -3554
  },
  {
    "code": "uz",
    "name": "Uzbekistán",
    "dial": "+998",
    "spriteY": -1293
  },
  {
    "code": "vu",
    "name": "Vanuatu",
    "dial": "+678",
    "spriteY": -1633
  },
  {
    "code": "ve",
    "name": "Venezuela",
    "dial": "+58",
    "spriteY": -1344
  },
  {
    "code": "vn",
    "name": "Vietnam",
    "dial": "+84",
    "spriteY": -1259
  },
  {
    "code": "wf",
    "name": "Wallis y Futuna",
    "dial": "+681",
    "spriteY": -324
  },
  {
    "code": "ye",
    "name": "Yemen",
    "dial": "+967",
    "spriteY": -2194
  },
  {
    "code": "dj",
    "name": "Yibuti",
    "dial": "+253",
    "spriteY": -2857
  },
  {
    "code": "zm",
    "name": "Zambia",
    "dial": "+260",
    "spriteY": -2092
  },
  {
    "code": "zw",
    "name": "Zimbabue",
    "dial": "+263",
    "spriteY": -2772
  }
];
export default phoneCountries;

