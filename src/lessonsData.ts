import { LessonModule } from './types';

export const LESSONS_DATA: LessonModule[] = [
  {
    id: 1,
    title: '¿Qué es el dinero?',
    subtitle: 'Aprende los conceptos básicos del intercambio de valor.',
    rewardXP: 15,
    rewardCoins: 10,
    questions: [
      {
        id: 101,
        text: '¿Cuál es la función principal del dinero en nuestra sociedad moderna?',
        options: [
          'Ser un objeto de colección brillante.',
          'Servir como un medio de cambio aceptado para comprar bienes y servicios.',
          'Garantizar que todos seamos millonarios sin trabajar.'
        ],
        correctAnswerIndex: 1,
        explanation: 'El dinero actúa como un medio de cambio estandarizado y aceptado por todos, facilitando el comercio sin recurrir al antiguo trueque.'
      },
      {
        id: 102,
        text: 'Antes de existir las monedas y billetes, ¿cómo intercambiaba la gente sus pertenencias?',
        options: [
          'A través del sistema de trueque directo (intercambio de productos).',
          'Usando tarjetas de crédito de piedra.',
          'Enviaban correos electrónicos rústicos.'
        ],
        correctAnswerIndex: 0,
        explanation: 'Se utilizaba el trueque: si tú tenías trigo y necesitabas lana, debías buscar a alguien con lana que quisiera trigo.'
      }
    ]
  },
  {
    id: 2,
    title: 'Diferencia entre necesidad y deseo',
    subtitle: 'Ahorra priorizando lo realmente indispensable.',
    rewardXP: 20,
    rewardCoins: 15,
    chestReward: { coins: 50, xp: 25 }, // Chest after this module
    questions: [
      {
        id: 201,
        text: '¿Cuál de los siguientes ejemplos representa una NECESIDAD fundamental?',
        options: [
          'Suscripción premium a un servicio de streaming de video.',
          'Comprar el último modelo de calzado deportivo de marca.',
          'Agua potable, alimentación nutritiva y un hogar seguro.'
        ],
        correctAnswerIndex: 2,
        explanation: 'Las necesidades son elementos indispensables para sobrevivir y mantener la salud física y mental.'
      },
      {
        id: 202,
        text: 'Si compras un café costoso de especialidad todos los días camino al trabajo, esto se clasifica como:',
        options: [
          'Un deseo (un gusto personal que podrías evitar o reducir para ahorrar).',
          'Una necesidad médica para mantener los ojos abiertos.',
          'Una obligación tributaria.'
        ],
        correctAnswerIndex: 0,
        explanation: 'Aunque el café es agradable, comprar café caro fuera es un deseo. Prepararlo en casa te ahorraría sumas considerables a largo plazo.'
      }
    ]
  },
  {
    id: 3,
    title: 'Presupuesto personal',
    subtitle: 'Aprende a distribuir tus ingresos usando la regla 50/30/20.',
    rewardXP: 25,
    rewardCoins: 20,
    questions: [
      {
        id: 301,
        text: '¿Qué propone la famosa regla presupuestaria 50/30/20?',
        options: [
          '50% para apuestas, 30% para ropa, 20% para comida.',
          '50% para necesidades básicas, 30% para deseos/gustos, 20% para ahorro o pago de deudas.',
          '50% para impuestos, 30% para alquiler, 20% para salir de fiesta.'
        ],
        correctAnswerIndex: 1,
        explanation: 'Esta regla equilibra un 50% en necesidades indispensables, un 30% en deseos de ocio y deleite, y un sano 20% destinado enteramente al ahorro o pago de deudas.'
      },
      {
        id: 302,
        text: '¿Cuál es el principal beneficio de llevar un presupuesto mensual escrito o digital?',
        options: [
          'Te permite saber exactamente a dónde va tu dinero en lugar de preguntarte a dónde se fue.',
          'Alinea tus chakras financieros automáticamente sin esfuerzo.',
          'Duplica mágicamente el saldo en tu cuenta de banco.'
        ],
        correctAnswerIndex: 0,
        explanation: 'El presupuesto te da control absoluto sobre tu flujo de efectivo, evitando las fugas invisibles conocidas como gastos hormiga.'
      }
    ]
  },
  {
    id: 4,
    title: 'Cómo ahorrar',
    subtitle: 'El hábito de pagarte a ti mismo primero.',
    rewardXP: 20,
    rewardCoins: 15,
    questions: [
      {
        id: 401,
        text: '¿Qué significa la frase financiera "págate a ti primero"?',
        options: [
          'Gastar todo tu sueldo en regalos de consuelo para ti el primer día del mes.',
          'Apartar una porción de tus ingresos para ahorro inmediatamente al recibir el pago, antes de gastar en otras cosas.',
          'Pagarle en efectivo al espejo para motivarte.'
        ],
        correctAnswerIndex: 1,
        explanation: 'Ahorrar lo sobrante al final del mes rara vez funciona. Si separas tu porción de ahorro en cuanto recibes tu sueldo, aseguras el hábito.'
      },
      {
        id: 402,
        text: '¿Qué son los denominados "Gastos Hormiga"?',
        options: [
          'Pequeñas compras diarias que parecen insignificantes pero sumadas representan una gran cantidad (combos, dulces, propinas).',
          'Los gastosVeterinarios de tus mascotas exóticas.',
          'Comprar alimentos especiales para hormigueros domésticos.'
        ],
        correctAnswerIndex: 0,
        explanation: 'El café chicle, el snack de la tarde o compras impulsivas baratas son gastos hormiga que minan silenciosamente tu presupuesto mensual.'
      }
    ]
  },
  {
    id: 5,
    title: 'Compras inteligentes',
    subtitle: 'Evita la trampa del consumo impulsivo y compara precios.',
    rewardXP: 20,
    rewardCoins: 15,
    chestReward: { coins: 80, xp: 40 }, // Chest after this module
    questions: [
      {
        id: 501,
        text: '¿Qué es la "regla de las 48 horas" para compras no esenciales?',
        options: [
          'Comprar un producto solo si tiene un envío de 48 horas gratis.',
          'Esperar 48 horas antes de comprar un artículo que deseas, para reflexionar con calma si realmente lo necesitas.',
          'Hacer fila fuera de la tienda durante 48 horas para conseguir un descuento.'
        ],
        correctAnswerIndex: 1,
        explanation: 'Al esperar 48 horas, se enfría el impulso emocional y las hormonas de la emoción de compra bajan, permitiendo razonar la adquisición.'
      },
      {
        id: 502,
        text: 'Estás comparando dos marcas de cereal con idénticos ingredientes sanos. ¿Cómo sabes cuál es más barata matemáticamente?',
        options: [
          'Eliges la caja con la ilustración animada más llamativa.',
          'Revisas el Precio por Unidad de Medida (por ejemplo, precio por gramo) en la etiqueta del estante.',
          'Compras el cereal más caro porque siempre asumimos que es mejor.'
        ],
        correctAnswerIndex: 1,
        explanation: 'Ver el precio por gramo o kilogramo te permite comparar el valor real del producto independientemente de los tamaños de los envases.'
      }
    ]
  },
  {
    id: 6,
    title: 'Fondo de emergencia',
    subtitle: 'Tu escudo protector contra los imprevistos de la vida.',
    rewardXP: 30,
    rewardCoins: 25,
    questions: [
      {
        id: 601,
        text: '¿Cuánto dinero se recomienda mantener acumulado en un fondo de emergencia sólido?',
        options: [
          'Equivalente a un fin de semana de fiesta en la playa.',
          'El dinero suficiente para pagar una membresía de gimnasio de por vida.',
          'Equivalente a entre 3 y 6 meses de tus gastos mensuales de subsistencia.'
        ],
        correctAnswerIndex: 2,
        explanation: 'Contar con 3 a 6 meses de gastos te protege de imprevistos graves, como emergencias médicas, averías de auto, o desempleo repentino.'
      },
      {
        id: 602,
        text: '¿Dónde es el mejor lugar físico o digital para guardar tu fondo de emergencia?',
        options: [
          'Bajo el colchón para tenerlo a la mano rápido.',
          'En una cuenta de ahorros de alta liquidez que te pague rendimientos mínimos pero esté disponible de inmediato.',
          'Invertido a largo plazo en acciones de riesgo moderado.'
        ],
        correctAnswerIndex: 1,
        explanation: 'El fondo debe ser líquido y seguro. No lo pongas en inmuebles ni acciones volátiles ni bajo el colchón (donde pierde valor por inflación).'
      }
    ]
  },
  {
    id: 7,
    title: 'Tarjetas bancarias',
    subtitle: 'Diferencia clave entre débito y crédito.',
    rewardXP: 25,
    rewardCoins: 20,
    questions: [
      {
        id: 701,
        text: '¿Cuál es la diferencia fundamental al pagar con tarjeta de débito frente a una de crédito?',
        options: [
          'La de débito usa tu propio dinero real ahorrado; la de crédito es un préstamo del banco que debes pagar después.',
          'La de débito es de plástico reciclado y la de crédito es de oro puro.',
          'El banco te descuenta un 50% de impuestos con la de crédito.'
        ],
        correctAnswerIndex: 0,
        explanation: 'Al usar débito, retiras tus propios fondos directamente. En crédito, estás usando dinero prestado por la entidad financiera, generando compromisos de pago.'
      },
      {
        id: 702,
        text: '¿Qué es el "pago para no generar intereses" en tu estado de cuenta de crédito?',
        options: [
          'Pagar el mínimo sugerido por el banco para evitar que te bloqueen la tarjeta.',
          'Pagar la totalidad de los consumos realizados en el período antes de la fecha límite, evitando cargos financieros extra.',
          'Un truco ilegal para engañar permanentemente al buró de crédito.'
        ],
        correctAnswerIndex: 1,
        explanation: 'Pagar el monto para "no generar intereses" significa que cancelas todo lo que le debes al banco ese mes, permitiéndote financiarte gratis.'
      }
    ]
  },
  {
    id: 8,
    title: 'Cómo evitar deudas',
    subtitle: 'Domina los conceptos de tasas de interés y deudas nocivas.',
    rewardXP: 25,
    rewardCoins: 20,
    chestReward: { coins: 100, xp: 50 }, // Chest after this module
    questions: [
      {
        id: 801,
        text: '¿Cómo definirías una "Deuda Buena"?',
        options: [
          'Una deuda que te permite comprar ropa de gala para lucir imponente.',
          'Un préstamo con tasa de interés alta para irte de vacaciones con amigos.',
          'Un financiamiento a tasa baja que utilizas para adquirir un activo que genera ingresos o aumenta su valor (como educación o un negocio).'
        ],
        correctAnswerIndex: 2,
        explanation: 'Las deudas buenas apalancan tu crecimiento económico financiero y se pagan solas con el flujo del activo adquirido.'
      },
      {
        id: 802,
        text: 'Si tienes varias deudas pequeñas con altas tasas de interés, ¿cuál es la estrategia de pago "Bola de Nieve"?',
        options: [
          'Esperar al invierno para que el frío congele las deudas en el banco.',
          'Pagar el mínimo en todas las deudas y enfocar todo tu dinero extra en liquidar primero la deuda de monto más pequeño.',
          'Pagar únicamente la deuda emocionalmente más fastidiosa.'
        ],
        correctAnswerIndex: 1,
        explanation: 'La estrategia bola de nieve acelera tus logros psicológicos al liquidar rápido las deudas más pequeñas, liberando ese flujo de caja para pagar las grandes.'
      }
    ]
  },
  {
    id: 9,
    title: 'Metas financieras',
    subtitle: 'Transforma tus sueños en objetivos con formato S.M.A.R.T.',
    rewardXP: 20,
    rewardCoins: 15,
    questions: [
      {
        id: 901,
        text: '¿Qué componente define que una meta de ahorro cumpla con el criterio S.M.A.R.T.?',
        options: [
          'Que sea increíblemente optimista e ilimitada.',
          'Que sea Específica, Medible, Alcanzable, Relevante y con un Plazo de tiempo definido.',
          'Que esté escrita en un papel dorado con purpurina.'
        ],
        correctAnswerIndex: 1,
        explanation: 'S.M.A.R.T. es una sigla en inglés: Específica (qué quieres), Medible (cuánto cuesta), Alcanzable (es realista), Relevante (por qué importa) y Temporal (cuándo lo lograrás).'
      },
      {
        id: 902,
        text: 'En lugar de decir "Quiero viajar algún día", ¿cuál es una meta S.M.A.R.T. correcta?',
        options: [
          'Ahorraré $4\'800.000 COP en 12 meses guardando $400.000 COP al mes para ir de vacaciones a Machu Picchu en junio de 2027.',
          'Viajaré por todo el mundo con poco presupuesto cuando tenga suerte.',
          'Ahorraré cien millones de pesos antes del próximo viernes.'
        ],
        correctAnswerIndex: 0,
        explanation: 'La primera opción tiene un monto claro, un destino, un plan mensual y una fecha límite real.'
      }
    ]
  },
  {
    id: 10,
    title: 'Inversión básica',
    subtitle: 'Pon tu dinero a trabajar para ti a través del interés compuesto.',
    rewardXP: 30,
    rewardCoins: 25,
    questions: [
      {
        id: 1001,
        text: '¿Qué es el "Interés Compuesto", descrito por Einstein como la octava maravilla del mundo?',
        options: [
          'Un impuesto de aduanas muy complejo.',
          'El interés que se calcula sobre el capital inicial, sumando los intereses acumulados de períodos anteriores para generar nuevos intereses.',
          'La tasa fija cobrada por bancos corruptos.'
        ],
        correctAnswerIndex: 1,
        explanation: 'El interés compuesto reinvierte las ganancias. Al sumarse los intereses al capital, la base de cálculo crece exponiendo una curva exponencial en el tiempo.'
      },
      {
        id: 1002,
        text: '¿Qué beneficio crucial provee la "Diversificación" al invertir?',
        options: [
          'Evita que tengas que pagar comisiones bancarias.',
          'No poner todos los huevos en la misma canasta, distribuyendo el capital para mitigar pérdidas.',
          'Hacer que tu dinero hable varios idiomas.'
        ],
        correctAnswerIndex: 1,
        explanation: 'Si una empresa o sector quiebra y habías invertido todo ahí, lo pierdes todo. Diversificar en múltiples activos disminuye radicalmente el riesgo general.'
      }
    ]
  },
  {
    id: 11,
    title: 'Ingresos y gastos',
    subtitle: 'Maximiza la brecha de ahorro aumentando ingresos activos y pasivos.',
    rewardXP: 25,
    rewardCoins: 20,
    questions: [
      {
        id: 1101,
        text: '¿Cuál de los siguientes es un ejemplo clásico de un "Ingreso Pasivo"?',
        options: [
          'El salario fijo ganado trabajando 8 horas de lunes a viernes.',
          'Regalías de un libro escrito, dividendos de acciones, o la renta de una vivienda.',
          'Dinero donado graciosamente por familiares.'
        ],
        correctAnswerIndex: 1,
        explanation: 'Un ingreso pasivo requiere poco o ningún mantenimiento constante para seguir rindiendo frutos financieros una vez que ha sido creado o adquirido.'
      },
      {
        id: 1102,
        text: '¿Qué sucede si tu porcentaje de ahorro mensual de ingresos es negativo de forma recurrente?',
        options: [
          'Estás gastando más de lo que ingresas y te estás endeudando o desgastando tu capital acumulado.',
          'Significa que estás listando tus gastos con un diseño futurista.',
          'El banco te perdonará las cuentas eventualmente.'
        ],
        correctAnswerIndex: 0,
        explanation: 'Gastar más de lo que ganas crea una brecha deficitaria que te obliga a recurrir a deudas tóxicas para complementar tu nivel de subsistencia tradicional.'
      }
    ]
  },
  {
    id: 12,
    title: 'Finanzas digitales',
    subtitle: 'Criptomonedas, billeteras electrónicas y ciberseguridad financiera.',
    rewardXP: 30,
    rewardCoins: 25,
    chestReward: { coins: 150, xp: 75 }, // Huge final chest
    questions: [
      {
        id: 1201,
        text: 'Para proteger tus claves y accesos a cuentas de banco digitales, ¿cuál es la mejor recomendación?',
        options: [
          'Usar contraseñas idénticas fáciles de recordar en toda tu huella digital y anotarlas en un papel.',
          'Activar el factor de doble autenticación (2FA) y usar un administrador de contraseñas con llaves robustas.',
          'Guardar tus contraseñas en un chat público.'
        ],
        correctAnswerIndex: 1,
        explanation: 'El 2FA agrega un escudo adicional. Incluso si un ciberdelincuente roba tu contraseña, no podrá acceder sin el código dinámico de tu dispositivo físico.'
      },
      {
        id: 1202,
        text: '¿Qué es lo primero que debes evaluar antes de invertir en criptoactivos o tokens digitales modernos?',
        options: [
          'La cantidad de colores que tiene el logotipo del proyecto.',
          'El nivel de volatilidad extrema, el respaldo real del proyecto, y no invertir dinero que no te puedas permitir perder por completo.',
          'Comprar de inmediato basados en un mensaje de un influenciador famoso.'
        ],
        correctAnswerIndex: 1,
        explanation: 'El ecosistema digital es altamente especulativo y volátil. Estar consciente del riesgo y entender la tecnología subyacente es fundamental ante cualquier inversión.'
      }
    ]
  }
];
