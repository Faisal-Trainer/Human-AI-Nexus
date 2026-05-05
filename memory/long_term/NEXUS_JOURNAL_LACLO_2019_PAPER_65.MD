> **METADATA (NEXUS SEMANTIC TAGS)**: [design, color-theory, psychology, ux, academic-research]





Exploring Mobile UX/UI for an OER Repository
Search Engine integrated to an LMS



Luis Carlos Guzmán-Arias, Jacqueline Solís-Céspedes, Agustín Francesa-Alfaro
TEC Digital
Instituto Tecnológico de Costa Rica
## Cartago, Costa Rica
luguzman, jacsolis, afrancesa @tec.ac.cr


Abstract—In  the  information  age  it’s  natural  for  students  to
search  Open  Educational  Resources  (OER)  for  their  own  learning
process  from  several  sources,  this  searching  must  give  the  results
with  simplicity,  speed  and  relevance,  to  make  the  information
understandable in an environment free of data overload. However,
although  some  universities  make  great  efforts  to  create  their  own
learning  materials  to  provide  the  student  with  the  resources  they
need,  often  the  user's  experience  in  repositories  of  OER  is  not
suitable  for  the  students,  triggering  disuse  and  unawareness  of  the
generated  resources.  This  study  was  conducted at the  Instituto
Tecnológico  de  Costa  Rica,  which  aims  to  help  students  to  find
reliable  OER,  in  a  simple,  fast  and  relevant  way,  by  means  of  a
search engine proposal integrated to the LMS platform. To achieve
this, quantitative studies were conducted with student samples, first,
an  email  survey  about  the  characteristics  of  a  search  engine,
second,  a  usability  test  of  an existing  repository  and  then  a search
engine's  GUI  integrated  with  an  LMS  was  designed  and  validated
with  users  so  the  main  result  was  that  students  may  have  a  better
UX  when  looking  for  OER  than  with  the  existing one  developed
with the open-source software DSpace.
Index Terms—Open    Educational    Resources,    Information
Retrieval,  OER  repository,  integration,  LMS,  usability,  dotLRN,
User Experience, TEC Digital.
## I. INTRODUCCIÓN
En  la  actualidad  existen  muchos  mecanismos  tecnológicos
para obtener información, de hecho, estamos saturados de esta
y   en   muchos   casos   el   reto   va   más   allá   de   encontrarla
únicamente,  sino  que  también  radica  en  el  hecho  de  tener  que
identificar si es confiable o no. En el ámbito de la educación no
se da la excepción, muchos estudiantes cuando tienen dudas de
un tema, para estudiar y hacer sus proyectos de clase acuden a
internet    como    fuente    principal    de    información    y    nos
encontramos  que  los  sitios  de  búsqueda  no  son  los  más
recomendables para realizar esta tarea [1], [3].
Por   esta   y   otras   razones   es   que   en   los   repositorios
universitarios   se   almacenan   Recursos   Educativos   Abiertos
(REA) o OER por sus siglas en inglés. Sin embargo, según se
ha   identificado,   estos   repositorios   no   son   los   que   los
estudiantes  prefieren  para  estudiar,  ya  que  son  complejos  de
utilizar,  tienen  mucha  información,  algunos  no  se  pueden
visualizar  correctamente,  entre  otros;  por  lo  que  autores  como
Casali,  A.,  Cechinel,   C.,   y   Ochoa,   X. [2],  “justifican  la
necesidad    de    establecer    estrategias    y    facilitar    nuevos
acercamientos para dar valor al concepto de compartir y reusar
contenido educativo” y dentro de sus estrategias mencionan el
uso de “diversos tipos de interfaces de búsqueda para ajustarse
a diversos perfiles de tareas”.
En virtud de ello, se realiza este artículo con el objetivo de
ayudar   a   los   estudiantes   a   buscar   recursos   educativos
confiables, de manera simple, rápida y relevante, por medio de
una   propuesta   de   buscador   integrado   a   la   plataforma   de
aprendizaje y algunos repositorios universitarios.
El enfoque para abordar esta situación, específicamente en
el   Tecnológico   de   Costa   Rica,   es   realizar   un   análisis
cuantitativo,   en   donde cabe   aclarar   que   no   se   contempla
explícitamente la   accesibilidad   como   eje   principal. En   la
primera   etapa  se   realiza   una   encuesta  a   una   muestra   de
estudiantes   con   el   fin   de   identificar   su   forma   de   buscar
información  para  el  aprendizaje.  Se  realiza  un  estudio  de
usabilidad  a  estudiantes  para  determinar  el  grado  de  facilidad
de    uso    del    repositorio    de    la    biblioteca    institucional
RepositorioTEC  (RT)  y  enmarcar  los  principales  obstáculos  a
nivel  de  usabilidad. Con  base  en  estos  dos  análisis  previos,  se
crea una propuesta de interfaz gráfica de un buscador de REA,
integrado al Sistema de Gestión de Aprendizaje (LMS por sus
siglas  en  inglés)  y  al  repositorio  de la  biblioteca  institucional,
además de la evaluación de dicha propuesta.
Las preguntas a responder con lo planteado son:
- ¿Qué  factores  existen  en  el  contexto  de  búsqueda  de
materiales   educativos   que   realizan   los   estudiantes
durante su proceso formativo?
- ¿El repositorio de REA del TEC es lo suficientemente
atractivo   y   funcional   para   que   los   estudiantes   lo
utilicen satisfactoriamente?
- ¿Qué  características  debe  tener  un  buscador  de  REA
para que los estudiantes lo utilicen?
- ¿Qué   consideraciones   relacionadas al   diseño   de
interfaz  gráfica  y  usabilidad  deben  tomarse  en  cuenta
en   un   buscador   de   recursos   de   aprendizaje   para
contribuir  en  el  logro  de  las  características  de  uso
requeridas por los usuarios?
Al  responder  estas  preguntas  se  pretende  contribuir  a  las
Universidades  que  consideren  tener  esta  misma  problemática,
más   puntualmente   a   los   académicos   de   nivel   directivo,



administradores de Tecnologías de Información y
Comunicación     (TIC),     Bibliotecas     y,     sobre     todo,     a
los estudiantes  a  tener  un  buscador  simple,  rápido  y  relevante
que cumpla con sus necesidades.
A   continuación,   el   trabajo   relacionado,   seguido   de   la
metodología, resultados y por último las conclusiones y trabajo
futuro derivados de este trabajo.
## II. TRABAJO RELACIONADO
Según  la  UNESCO,  “los  recursos  de  aprendizaje  bien
diseñados fomentan más contacto individual del estudiante con
información,  ideas  y  contenidos  de  lo  que  sería  posible  lograr
solamente con clases” [7]; sin embargo, para acceder a estos
recursos, Acuña Sossa et al. [1], citando a Terrasse et al. [20],
se  indica  que  los  usuarios  necesitan  un  acceso  flexible  a
materiales  de  bajo  costo  para  elegir  según  las  necesidades
específicas. Así mismo, citando a Hatzipanagos y Gregson [21]
declaran que hay una preferencia para utilizar los recursos que
tengan  un  propósito  claro,  estén  contextualizados  y  resulten
prácticos (p. 267).
En   contraposición,   en   la   referencia   [5],   realizaron   un
experimento con diversos usuarios a los que se les presentaron
distintas  interfaces  de  búsqueda  en  un  repositorio  de  recursos
educativos, entendiendo que emplearían una u otra en razón al
tipo  de  búsqueda  a  realizar.  Dentro  de  sus  conclusiones,
mencionan que la primera barrera a romper con los usuarios, es
ayudarles  a  comprender  la  utilidad  que  pueden  ofrecer  las
interfaces  distintas  a  las  tradicionales  cajas  de  texto  para
búsquedas;  ya  que  la  mayoría  de  los  usuarios  no  conocen  la
diferencia   entre   una   búsqueda   textual   y   una   búsqueda
semántica, ni cuándo conviene emplear una o la otra.
Dada la necesidad de promover el uso de los repositorios y
sus REA, los autores se han dado a la tarea de ofrecer múltiples
enfoques  con  el  fin  de  atacar  el  problema.  Alpizar-Chacon  y
Meneses-Guillen [6], proponen una estrategia para fomentar la
visualización de REA diseñados en la universidad mediante un
repositorio  de  consultas  abiertas  y  una  tropicalización  de  los
metadatos. Maldonado, Siguencia y Carvallo [15] sugieren que
para promover el uso de los repositorios y sus recursos se debe
trabajar   en   repositorios   centralizados,   con   su   respectiva
normativa   y   al   mismo   tiempo,   ofrecer   incentivos   a   los
generadores   de   materiales   para   despertar   el   interés   por
compartir.  Además,  Duque,  Tabares,  y  Vicari  [9],  sugieren  el
mapeo  de  los  estilos  de  aprendizaje  como  una  estrategia  para
mejorar la usabilidad de los recursos. Mientras que García [5],
propone  el  uso  de  patrones  de  diseño  para  sistematizar  la
producción de REA, basándose en enfoques pedagógicos  y en
los  conocimientos  de  expertos  en  áreas  multidisciplinares  y
como  parte  de  la  problemática  analizada  para  construir  y
compartir REA, el autor rescata que “no se están cumpliendo
las  expectativas  de  las  instituciones  y  el  área  global  del  e-
learning  debido  fundamentalmente  a  que  los  esfuerzos  se
centran  en  las  implicaciones  técnicas  que  supone  disponer  de
materiales independientes de las plataformas
(interoperabilidad)  y  no  en  garantizar  la  independencia  del
contexto de aprendizaje (a nivel pedagógico)” .
Desde otra perspectiva, Atenas y Havemann [17], proponen
el uso de indicadores para evaluar la calidad de los repositorios
de  objetos  de  aprendizaje  y  dentro  de  estos,  destaca  el  uso  de
herramientas  de  evaluación  por  parte  de  los  usuarios,  para
permitirles  evaluar  los  recursos  expuestos  en  el  repositorio.
Esta  información  es  sumamente  relevante  desde  el  punto  de
vista   de   la   experiencia   de   usuario   (UX)   para   cuantificar
usabilidad, productividad y mejorar los sitios web [23].
Según   [4],   en   un   análisis   de   los   diferentes   factores
inhibidores  para  las  prácticas  de  educación  abierta, “hay poca
experiencia sobre cómo apoyar eficazmente a comunidades de
práctica  mediante  repositorios  educativos”  y  para  que  estas
actividades    se    vean    enriquecidas,    se   debe    permitir    la
interacción  tanto  para  crear  como  para  compartir  recursos  en
los distintos   contextos   de   aprendizaje,   mediante   usuarios
activos que estén dispuestos a compartir abiertamente material
educativo  propio.  Aunque,  [8]  indica  que  en  una  encuesta
realizada  se  determinó  que,  aunque  los  entrevistados  obtienen
el  50%  de  sus  materiales  de  internet,  solamente  el  12%
comparte  sus  propios  recursos  por  este  medio,  a  pesar  de  que
existían   dudas   sobre   los   derechos   de   autoría   de   dichos
materiales.
Desde  el  punto  de  vista  de  diseño,  la  educación  virtual
involucra contemplar cualidades de acceso de calidad y tiempo;
ya  que  las  barreras  naturales  del  espacio  del  aula  se  ven
modificadas  y  los  estudiantes  deben  distribuir  sus  prioridades
entre  el  estudio,  trabajo,  la  familia  y  ellos  mismos  [10].
Además,  existen  otros  factores  que  se  deben  considerar,  por
ejemplo,   que   un   estudiante   puede   estar   aprendiendo   los
conceptos  y  al  mismo  tiempo,  aprendiendo  a  utilizar  el  LMS;
lo cual puede generar frustración [11].
Para esto, Morville y Callender [12] plantean que el uso de
patrones  de  búsqueda  permite competir  en  un  mundo  donde
existe   una   obsesión   en   la   atención   al   detalle,   y   permite
descartar información de una forma simple, rápida y relevante
usando como punto de referencia la psicología del usuario y los
patrones   de   comportamiento   humano.   Esto   nos   permite
comprender los motivos que mueven a un usuario para llegar a
un  sitio  web  y  la  forma  en  que  le  da sentido  a  la  información
que recibe en su contexto particular [14].
Entre los trabajos de relacionados a los LMS, encontramos
que  en  [16]  se  explora  una  implementación  basada  en  multi-
agentes  para  realizar  búsquedas  en  repositorios  de  objetos  de
aprendizaje  sobre  la  plataforma  dotLRN;  sin  embargo,  no  se
dan detalles sobre los mecanismos de visualización dentro de la
plataforma.  Otros  trabajos  para  diversas  plataformas  de  LMS
se   han   centrado   en   aspectos   de   consumo   [25]   [26]   y
recomendación de REA [27] [28] [29] [30] [31] [32] [33] [34]
[35]  más  que  en  los  procesos  de  diseño de  producto  centrado
en el usuario final o bien, en los mecanismos de visualización y
arquitectura de información.
## III. METODOLOGÍA
El enfoque metodológico de esta investigación se basa en la
primera  fase  de  desarrollo  de  un  producto,  que  según  Rohrer
[13],  constituye  la  fase  estratégica  temprana  y  exploratoria,
cuyo abordaje es cuantitativo.



A  continuación,  las  actividades  puntuales  desarrolladas  en
dicha metodología.
A. Encuesta remota a estudiantes
Por  medio  de  una  encuesta  abierta  de  GoogleForms  a  una
muestra de  estudiantes  se  plantearon  las  preguntas  enfocadas
en:    caracterización    demográfica,    conocimiento    sobre    el
Repositorio TEC, recursos y medios que utiliza cuando estudia,
y  una  sección  de  opinión.  La  encuesta  se  valida inicialmente
con tres personas, se corrige según las observaciones y luego se
valida nuevamente con otras 3 personas, se hacen los cambios
y  luego  se publica. Cómo  alternativa  a  esto  se  recomienda
utilizar   una   prueba   estandarizada   para   medir   el   nivel   de
usabilidad percibido como el System Usability Scale (SUS).
B. Prueba de usabilidad del RT
El  objetivo  de  esta  prueba  es  determinar  cuáles  puntos  de
mejora  y  fortalezas  tiene  el  sistema  en  cuanto  a  usabilidad,
específicamente     respecto     al     factor     clave     findability,
considerado  de  interés  particular  y  fundamental  en  cualquier
repositorio. Para ellos se utiliza la prueba de primer clic o First-
Click  Testing  (PPC),  mediante  una  herramienta  de  software
especializada  como  Optimal  Chalkmark  que  permite  obtener
datos  de  análisis  a  nivel  conductual de  las  personas  en  el
contexto de interacción directa con el sitio web en estudio.
C. Diseño de la propuesta
Se  toman  en  cuenta  los  hallazgos  de  la  encuesta,  los
patrones de búsqueda y oportunidades de mejora detectadas en
el   sistema   existente   Repositorio TEC   para   concretar   un
prototipo   interactivo   mediante   las   herramientas   Sketch   e
InVision.
D. Prueba de usabilidad de la propuesta
El objetivo es explorar oportunidades de mejora respecto a
lo  existente  en  el  factor  clave  findability,  así  como  recopilar
indicios  respecto  a  patrones  de  diseño  y  de  usabilidad  en
general.  Esto  por  medio  de  un  estudio  de  usabilidad  no-
moderado  remoto,  utilizando  una  herramienta  de  software
especializada    como    Maze,    que    permite    obtener    datos
cuantitativos para análisis a nivel conductual de las personas en
el contexto de interacción directa con la propuesta. Se resumen
las características principales de la metodología en la Tabla I.
## TABLA I.  METODOLOGÍA APLICADA Y CARACTERÍSTICAS PRINCIPALES
Aspecto Estudios realizados

1er estudio 2do estudio 3er estudio
## Método Encuesta
Prueba de
usabilidad *
Prueba de
usabilidad
## Herramienta
## Google
## Forms
## Optimal
## Chalkmark
## Maze
## Tipo Cuantitativo Cuantitativo Cuantitativo
## Resultados
## Actitudinal
(lo que dice)
## Conductual
(lo que hace)
## Conductual
(lo que hace)
Objeto de
estudio
## Experiencia
de usuario
## (UX)
Interfaz gráfica
## RT
Interfaz gráfica
propuesta
Dimensión a
explorar
El problema Lo existente La propuesta
- = Prueba de usabilidad de tipo First-Click.
## IV. RESULTADOS Y ANÁLISIS
Como se  menciona  en  la  metodología,  la  primera  etapa
constaba de una encuesta abierta a una muestra de estudiantes.
A. Encuesta remota a estudiantes
La muestra aleatoria de la población documentó un total de
107  casos  con  la  distribución  de  la  Tabla  II. Cabe  aclarar  que
este   estudio   no   adjudica   significancia   estadística   por   la
naturaleza pre-experimental del mismo.
## TABLA II.  DATOS DEMOGRÁFICOS DE LOS PARTICIPANTES.

## Hombres Mujeres Totales
Rango de edad % n % n % n
15 y 20 años 30.51 18 35.42 17 32.71 35
21 y 25 años 38.98 23 37.50 18 38.32 41
26 y 30 años 18.65 11 18.75 9 18.69 20
31 y 35 años 3.39 2 6.25 3 4.67 5
Más de 35 años 8.47 5 2.08 1 5.61 6
## Totales
## 100 59 100 48 100 107

La     población     encuestada     constituye     una     muestra
balanceada en cuanto a género; sin embargo, la distribución de
los   grados   académicos   se   centra   en   los   estudiantes   de
bachillerato,   licenciatura   y   programas   técnicos;   los   cuales
representan    un    28%,    37.4%    y    28% de    la    muestra
respectivamente.  Los  estudiantes  de  maestría representaron
únicamente  un  5.6%  de  la  muestra  y  no  se  contó  con  la
participación de estudiantes de doctorado.
Con  respecto  al  conocimiento  y  uso  del  RT,  33  personas
indican que lo conocen  y lo han utilizado, 18 que lo conoce  y
no   usa   y   56   que   no   lo   conoce.   El   alto   grado   de
desconocimiento acerca de la herramienta del repositorio es un
elemento  de  interés,  ya  que  la  muestra  no  fue  dirigida  hacia
estudiantes   de   nuevo   ingreso;   es   decir,   es   información
conocida.
Sobre los medios de búsqueda utilizados por los estudiantes
para  obtener  recursos  de  recursos  educativos  reflejó  que  solo
19  personas  utilizan  el  RT,  lo  que  equivale  a  un  17.8%  de  la
muestra. Además 59 estudiantes utilizan el LMS TEC Digital,
83  prefieren  el  material  físico  y  91  utilizan  otras  fuentes para
estudiar como Google o YouTube. Para obtener estos recursos,
predomina el uso de dispositivos celulares y computadoras con
75   y   97   personas   respectivamente,   y   solo   10   personas
manifestaron preferir el uso de las tabletas.
Al  consultar  sobre  los  criterios  de  selección  que  prefieren
utilizar  los  estudiantes  para  filtrar  los  REA,  encontramos  que
predomina  la  recomendación  del  profesor  y  de  compañeros,
con 85 y 48 personas respectivamente, mientras que otro grupo
importante de 41 personas, indica que su criterio está basado en
utilizar cualquier material que pueda conseguir en internet.
Para  determinar  el  grado  desmotivación  que  enfrentan  los
estudiantes  al  realizar  búsquedas  de  REA  se  enumeraron  una
serie de condiciones frecuentes al navegar por internet y se les
presentó  una  escala  de  Likert  para  expresar  su  opinión (ver
Tabla   III). Ante  la  pregunta:  “De  los  siguientes  posibles



obstáculos  al  buscar  materiales  de  aprendizaje  ¿Cuáles  lo
desmotivan a seguir buscando?”, los criterios fueron:
A1. Muchos clics para navegar.
A2. Lentitud al cargar la página.
A3. No se visualiza en línea (requiere descargar para ver).
A4. Sitio de búsqueda complejo de usar.
A5. Pocos resultados en la búsqueda.
A6. Excesivos resultados en la búsqueda.
A7. Poca relevancia en los resultados de búsqueda.
A8. No hay manera de filtrar la búsqueda por idioma.
En  la  Tabla  III podemos observar que  los  principales
factores que incitan la desmotivación de los estudiantes ante la
búsqueda  de  materiales  son A7,  A2,  A4 y A5.  Por  otro  lado,
A6 y A8 se destacaron como las características que la mayoría
de  los  encuestados  consideran  como  indiferentes  para  generar
la desmotivación.
## TABLA III.  RESULTADOS: FACTORES DESMOTIVANTES
## AL BUSCAR UN REA.
Criterios Escala de desmotivación
Muy desmotivante Desmotivante Es indiferente
## A1 42 33 25
## A2 55 28 17
## A3 36 27 37
## A4 46 31 23
## A5 44 46 10
## A6 9 35 56
## A7 58 32 10
## A8 21 28 51

Para  validar  las  características  que  se  deben  incluir  en  el
diseño del buscador integrado al LMS TEC Digital, se planteó
una  escala  de Likert  para  preguntar  a  los  estudiantes  sobre  lo
que  ellos  consideran  relevante  en  el  mismo.  Además, se  abrió
la  posibilidad  de  que  los  encuestados  incorporen  sus  propias
sugerencias (ver Tabla IV). Los criterios fueron:
B1. Compartir los resultados de búsqueda.
B2. Puntuar el material de aprendizaje.
B3. Vista previa del material de aprendizaje.
B4. Leer y escribir comentarios al material de aprendizaje.
B5. Visualizar indicador de estudiantes que lo puntuaron.
B6. Ver cantidad de cursos en los que se utiliza el material
de aprendizaje.
B7. Ver recursos asociados a determinada escuela, carrera,
plan y curso.
B8. Ver cantidad de visualizaciones.
B9. Selección personalizada de materiales (Mis favoritos)
La  Tabla  IV, nos  muestra  que  la  población  se  encuentra
principalmente  interesada  en  los criterios:  g,  c,  i  y  f.  También
fueron identificados como importantes, los criterios b, d, c y e.

## TABLA IV.  RESULTADOS: CARACTERÍSTICAS DE LA PROPUESTA.
Criterios Escala de importancia

## Muy
importante
## Importante
## Poco
importante
## Nada
importante
## Es
indiferente
## B1 24 32 21 8 22
## B2 32 49 13 3 10
## B3 51 37 13 1 5
## B4 24 38 27 8 10
## B5 26 37 18 10 16
## B6 40 26 19 7 15
## B7 55 24 14 7 7
## B8 15 28 28 12 24
## B9 49 28 13 8 9

Por último, las sugerencias brindadas por los estudiantes y
que pueden ser atendidas en esta fase de diseño, son: a) Filtros
por fecha y tipo de recurso: Solicitan la posibilidad de ordenar
por fechas de creación e incorporar filtros por tipos de material,
b)  Filtros  por  categorías:  por  carreras  o  categorías  generales;
también  la indexación  alfabética,  c)  Recursos  descargables:
Ofreciendo  la  posibilidad  de  descargar  el  material  en  varios
formatos o agregarlo a la nube de forma amigable, d) Generar
bibliografías de manera automática y f) Interfaz amigable: Que
sea puntual y ágil al encontrar la información.
B. Prueba de Usabilidad del RT
Según la metodología, la segunda etapa consiste en someter
a   prueba   el   sistema   actual   del   RT   utilizando   el   método
denominado PPC.
Se  reclutaron  estudiantes  de  diferentes  grados  académicos
vía  correo  electrónico,  tomando  como  base  la  lista  de  correos
que   se   utilizó   en   la   encuesta   anterior   y   seleccionando
aleatoriamente   un   50%   de   prospectos   para   cada   grado
académico en estudio.
La muestra de población para la prueba, documentó un total
de    28    personas    reclutadas,    de    las    cuales   7    personas
abandonaron   antes   de   iniciar   la   prueba,  por   lo   tanto,   se
contabilizaron 21 participantes efectivos.
A todos los participantes se le hizo una pregunta previa con
respecto  al  uso  del  RT,  4  personas  indicaron  que  lo  han
utilizado, 9 que no lo han usado y 8 que no están seguros si lo
han usado o no. Esto es en realidad un eco de los indicios que
se  recuperaron  de  la  encuesta  aplicada  a  los  estudiantes  (ver
## Fig. 1).
1) Tarea   1.   Uso   de   caja   de   búsqueda   para   generar
consultas   de   recursos   educativos: Para   la   tarea   1,   se
registraron  21  clics  en  total,  de  los  cuales  6  clics  fueron
realizados   en   las   áreas   correctas   y   15   clics   en   áreas
incorrectas. Por lo tanto, la tasa de éxito (TE) fue de un 29%,
siendo mayor el porcentaje de desacierto con un 71%.





Fig. 1.  Mapas de calor (MC) de las pruebas de usabilidad del RT.

Se  concluye  que  la  caja  de  búsqueda  debe  permanecer
visible  desde  la  página  de  inicio  y  de  fácil  acceso  durante  el
proceso de búsqueda.
2) Tarea  2.  Visualización  y  reproducción  de  un  recurso
educativo  desde  la  página  de  resultado  específico  o  ficha
detallada  del  recurso: Se  registraron  21  clics  en  total,  de  los
cuales 4 fueron realizados correctamente y 17 no. Por lo tanto,
la TE fue de un 19%, siendo mayor el porcentaje de desacierto
con un 81%.
Se   puede   deducir   que,   aunque   la   página   de   la   ficha
detallada   de   un   recurso   muestra   una   gran   cantidad   de
información  a  nivel  de  metadatos,  el  usuario  tiene  problemas
para   descifrar   dónde debe   hacer   clic   para   visualizar   y
reproducir el material.
3) Tarea  3.  Navegación  entre  página  de  resultados  de
búsqueda  y  página  de  un  resultado  específico: En  la  tarea  3,
se registraron 21 clics en total, de los cuales 5 fueron correctos
y  16  incorrectos. Por  lo  tanto,  la  TE  es  de  un  24%,  siendo
mayor el porcentaje de desacierto con un 76%.
Respecto   al   MC   resultante,   se   puede   observar   alta
dispersión  de  la  mayoría  de  los  clics,  pero  se  distinguen  3
agrupaciones de clics ubicados en ciertos sectores de elementos
de interfaz que merecen atención:
a) Sector C. Se contabilizan 3 clics sobre el elemento de
interfaz  que  acciona  la  visualización  /  descarga  del  recurso
educativo.  Permite  constatar  el  comportamiento  esperado  de
los clics en ese punto.
b) Sector  D. Conjunto  de  4  clics  en  la  zona  accionable
con la etiqueta “mostrar más información”. Se destaca que los
usuarios  esperaban  descubrir  ahí  una  solución  a  la  tarea
asignada.
c) Sector   E. Se   contabilizan   7   clics   a   lo   largo   del
elemento  migas  de  pan  o  breadcumbs.  Este  comportamiento
nos indica que algunos usuarios esperaban descubrir en el uso
de breadcumbs una posible solución a la tarea 3.
Se  confirma  en  parte  lo  señalado  en  la  tarea  anterior
respecto  a  la  gran  cantidad  de  información  presente  en  la
página de la ficha detallada de un recurso.
C. Diseño de la propuesta
Para   este   paso   se   tomaron   en   cuenta   los   siguientes
hallazgos   de   la   encuesta:   el   sitio   de   búsqueda  actual   es
complejo de usar y se requieren muchos clics para navegar, se
necesita   la vista   previa de   los   recursos,   una   sección
personalizada para clasificar materiales, puntuar los materiales
y visualizar las puntuaciones de los estudiantes que calificaron
los REA.
Además, se  tomaron  en  cuenta  algunos  de  los  patrones  de
diseño  que  menciona  Morville  y  Callender  [12]:  Lo  mejor
primero,   búsqueda   avanzada,   personalización   y   resultados
accionables.
Y, por último, las oportunidades de mejora detectadas en el
sistema existente RT: caja de búsqueda visible y de fácil acceso
desde  la  página  de  inicio  y  durante  el  proceso  de  búsqueda,
facilitar la navegación ida y vuelta, facilitar la visualización de
los   recursos   educativos   y   dosificar   la   carga   cognitiva   en
general.
Es  importante  resaltar  que  la  propuesta  se  generó  bajo  el
principio  de mobile  first,  por  ende,  todas  las  pantallas  del
prototipo  se  diseñaron  primero  para  dispositivos  móviles  (ver
## Fig. 2).







Fig 1. Imagen de la interfaz y mapas de calor (MC) resultantes de la prueba de usabilidad de la propuesta.


D. Prueba de usabilidad de la propuesta.
Se  reclutaron  estudiantes  tomando  como  base  el  otro  50%
restante de la prueba del paso 2 Prueba de Usabilidad del RT.
La  muestra  de  población  para  la  prueba  de  usabilidad  del
Repositorio   TEC,   documentó   un   total   de   34   personas
reclutadas, de las cuales 13 personas abandonaron, por lo tanto,
se  contabilizaron   finalmente  21  participantes  efectivos (se
omite  la  tarea  1  puesto  que  no  forma  parte  del  fondo  del
estudio, las tareas 2, 5, 6 y 7 se resumen al final):
1) Tarea  3.  Visualización  y  reproducción  de  un  recurso
educativo, es decir, cuando el estudiante accede al contenido
de  aprendizaje  de  un  REA  desde  el  sitio  web  en  estudio: La
cantidad  de  participantes  que  completaron  la  tarea  fue  de  18
personas. La TE en general fue de un 100%, del cual un 89%
fue  directo  y  un  11%  indirecto  en  alcanzar  la  pantalla  final
marcada  como  meta  exitosa  de  la  tarea.  En promedio  los
participantes obtuvieron una tasa de clic erróneos de un 13%.
Esta tarea en particular fue compatible para ser comparada
con  los  resultados  de  la  tarea  2  de  la  prueba  primer-clic  del
Repositorio   TEC.  Ambas  fueron   formuladas  de  la  misma
manera, el punto de partida y el de llegada.
Se obtuvo que 12 participantes dieron su primer clic en las
áreas  correctas,  mientras  que  8  participantes  en  las  áreas
incorrectas.  De  modo  tal  que,  la  TE  en  primer-clic  de  la
propuesta  fue  de  un  67%  en  contraste  con el  19%  obtenido
anteriormente en la prueba aplicada al RT.
2) Tarea  4.  Navegación  entre  página  de  visualización  o
reproducción    del    contenido,    página    de    resultados    de
búsqueda y página de un resultado específico (ficha detallada
del  REA): La  cantidad  de  participantes  que  iniciaron  la  tarea
fue de 18 personas, sin embargo, en el transcurso una persona
renunció,  representando  así  un  6%  de  abandono.  La  TE  en
general fue de un 94%, del cual un 61% fue directo y un 33%
indirecto  en  alcanzar  la  pantalla  final  marcada  como  meta
exitosa  de  la  tarea.  En  promedio  los  participantes  obtuvieron
una tasa de clic erróneos de un 9%.
El  resultado  individual  de  esta  tarea  indica  que  la  gran
mayoría  de  participantes  pudo  navegar  de  ida  y  vuelta  sin
dificultades significativas entre la pantalla de reproducción del
recurso  y  la  pantalla  de  los  resultados  de  búsqueda,  lo  cual
favorece   el   ejercicio   errante   y   exploratorio   de   cualquier
proceso de búsqueda.
Esta    tarea    fue    compatible    para    ser    analizada    en
comparación con la tarea 3 del estudio realizado al RT. Por lo
tanto,   luego   de   filtrar   en   la   herramienta   Maze   el   MC
correspondiente  se  obtuvo  que  la  TE  en  primer-clic  de  la
propuesta fue de un 61% en contraste con el 24% obtenido en
la  prueba  aplicada  al  RT.  Derivado  de  la  comparación de
resultados  de  primer-clic,  se  tiene  que  la  propuesta  ofrece  al
usuario  una  solución  más  intuitiva  para  navegar  por  el  sitio
durante un proceso de búsqueda que la que ofrece el repositorio
existente.
Por  último,  a  todos  los  participantes  se  les  realizó una
pregunta    de    cierre    de    tipo    abierto    y    opcional    para
recolectar observaciones  y  opinión  general  respecto  al  sitio  en
estudio. Se obtuvieron 14 comentarios, donde los participantes
mencionaron en total 9 veces estar satisfechos con la propuesta,



mientras que  5  veces  se  mencionó  que  la  navegación  a  la
sección  “Mis  recursos  guardados”  resultó  poco  intuitiva  y  2
veces se señaló que el botón de abrir recurso es poco claro.
3) Tareas 2, 5, 6 y 7: Además de las anteriores, se validaron
cuatro  tareas  más,  la  2  que fue  la  selección  según  nombre  de
profesor  y  recurso  mejor  calificado,  el  cual  tuvo  una  TE  de
86%. La tarea 5, la cual era calificar un REA, obtuvo una  TE
de 100%, la tarea 6 para agregar un recurso a “mis favoritos”,
con una TE 100% y la tarea 7 para navegar en “mis favoritos”
cuya  TE  fue  de  un  89%.  Con  estas  tareas  adicionales  se
validaron   las   principales   características   deseables   por   los
usuarios obtenidas de la encuesta.
## V. LIMITACIONES
El   trabajo   realizado   sucede   en   una   etapa   previa   a   la
ejecución  del  proyecto  como  tal,  inicialmente  para  explorar  el
rumbo   estratégico,   validar   la   problemática   y   hacer   una
propuesta  temprana  de  la  solución,  con  fundamentos  sólidos
para  justificar  la  realización  del  proyecto.  Por  lo  tanto,  no  se
siguió  la  metodología  de  requerimientos  [22]  y  de  desarrollo
del TEC Digital, puesto que en realidad representa las dos fases
de ejecución y validación que suceden posteriormente a la fase
estratégica  expuesta  en  el  presente  documento,  según  Rohrer
## [13].
La  encuesta  se  realizó  en  periodo  de  vacaciones  de  los
estudiantes, se lanzó abiertamente en redes sociales y se envió
por listas de correo electrónico, por lo que se considera que la
respuesta fue bastante amplia considerando las circunstancias.
## VI.  CONCLUSIONES Y TRABAJO FUTURO
Recapitulando   las   preguntas   iniciales   del   artículo,   se
encontró    que    los    principales    factores    que    incitan    la
desmotivación   de   los   estudiantes   ante   la   búsqueda   de
materiales son: la poca relevancia de los resultados obtenidos,
la velocidad de carga de los sitios, la complejidad para realizar
las búsquedas y obtener pocos resultados ante sus consultas. De
los  elementos  consultados  y  las  pruebas  de  usabilidad,  se
concluye  que  el  RT  presenta  deficiencias  en  cuanto  a  los
criterios de simplicidad y navegación que podrían ser en parte
mitigados  con  la  aplicación  de  patrones  de  diseño.  Para  la
validación, se aplicaron dos test de usabilidad que compararon
la funcionalidad actual con respecto a la nueva propuesta  y se
obtuvo una mejora del 48% en cuanto a la TE de las tareas de
visualización  y  reproducción  de  un  recurso  educativo  y  de  un
37%  en  la  navegación  entre  páginas  durante  un  proceso  de
búsqueda.
De la evaluación sobre el conocimiento del RT y su uso por
parte  de  los  usuarios,  se  encontró  que  existe  un  problema
relacionado    al    desconocimiento    generalizado    sobre    la
existencia  de  la  herramienta;  ya  que  la  mitad  de  la  población
encuestada  no  la  conoce  y  solo  un  17.8%  de  la  población
afirma utilizarlo para buscar materiales de estudio. Además, las
pruebas  de  usabilidad  reflejaron  que,  a  pesar  de  la  percepción
de  conformidad  del  usuario  con  la  interfaz,  existen  elevadas
tasas   de   error   en   la   navegación   y   la   arquitectura   de   la
información;  por  lo  que  es  necesario  reestructurar  el  concepto
de   navegación   general   con   el   fin de   resultar   atractivo   y
funcional para el usuario final.
Para satisfacer las expectativas de un buscador de REA, los
encuestados indicaron que la solución propuesta debe ofrecer al
menos:  facilidad  de  búsqueda,  simplicidad  en  la  navegación,
vista   previa de   los   recursos,   ofrecer   la   oportunidad   de
administrar  un  área  personalizada  para  clasificar  materiales,
permitir puntuar los materiales almacenados en el repositorio y
visualizar los indicadores de los estudiantes que calificaron los
REA. Además, se espera que los buscadores contemplen el uso
de   patrones   de   diseño   que   le   permitan   preguntar,   filtrar,
navegar,  entender  y  compartir  los  REA  recuperados  en  sus
búsquedas  respetando  el  criterio  de findability asociado  a  este
tipo de sistemas.
Como   trabajo   futuro,   se   pretende   continuar   con   la
aplicación de la metodología de requerimientos y de desarrollo
del  TEC  Digital,  con  el  fin  de  implementar  la  propuesta.
Además,  se  plantea  realizar  las  mediciones  del  caso  para
compartir   la   experiencia   de   la   puesta   en   marcha de   la
propuesta.
## REFERENCIAS
[1] M.  Acuña  Sossa,  G.  Rendón,  M.  Eugenia,  and  A.  M.  Sandoval
Poveda,  “Buenas  prácticas  para  la  selección  de  recursos
educativos    abiertos:    experiencias    del    MOOC    innovación
educativa con REA, “Actualidades Investigativas en Educación,
vol. 16, no. 2, pp. 47–73, 2016.
[2] A.  Casali,  C.  Cechinel,  and  X.  Ochoa,  “Edición  especial:
Estrategias    para    mejorar    la    usabilidad    de    repositorios
educativos,”  Revista  Iberoamericana  de  Tecnologías  del
Aprendizaje, vol. 3, no. 2, pp. 76–77, 2015.
[3] D.  Martín-Moncunill,  P.  Gaona-García,  E.  García-Barriocanal,
and  S.  Sánchez-Alonso,  “Selección  y  uso  de  mecanismos  de
búsqueda  en  repositorios  de  objetos  de  aprendizaje:  el  caso  de
Organic.Edunet,”  Versión  Abierta  Español–Portugués   de   la
Revista    Iberoamericana    de    Tecnologías    del    Aprendizaje,
Sociedad  de  Educación  del  IEEE,  vol.  3,  no.  2,  pp.  122–129,
## 2015.
[4] G. Geser, “Prácticas y recursos de educación abierta: la hoja de
ruta  olcos  2012,”  International  Journal  of  Educational
Technology in Higher Education (ETHE), vol. 4, no. 1, 2007.
[5] A. M. García, “Patrones de diseño aplicados a la organización
de repositorios de objetos de aprendizaje,” Revista de Educación
a Distancia,2009.
[6] I.   Alpizar-Chacon   and   L.   Meneses-Guillen,  “Estrategia  de
visibilidad  de  recursos  educativos  abiertos  para  el  sistema  de
educación costarricense a través de un repositorio institucional,”
## 2016.
[7] Directrices  para  los  recursos  educativos  abiertos  (REA)  en  la
educación superior. UNESCO Publishing, 2015.
[8] V.  Rolfe,  “Open educational   resources:   staff   attitudes   and
awareness.” Research in Learning Technology, vol. 20, no. 1, p.
n1, 2012.
[9] N.  D.  Duque,  V.  Tabares,  and  R.  M.  Vicari,  “Mapeo  de
metadatos  de  objetos  de  aprendizaje  con  estilos  de  aprendizaje
como  estrategia  para mejorar  la  usabilidad  de  repositorios  de
recursos  educativos,”  Versión  Abierta  Español-portugués,  vol.
## 107, 2015.



[10] E. R. Kahu, C. Stephens, N. Zepke, and L. Leach, “Space and
time  to  engage:  mature-aged  distance  students  learn  to  fit  study
into  their  lives,”  International  Journal  of  Lifelong  Education,
vol. 33, no. 4, pp. 523–540, 2014.
[11] M.  P.  McNamara  and  B.  Paulovich,  “Evaluating  the  online
studio  as  a  retraining  ground  for  mature-age  graphic  design
students,”  in  Australian Council of University Art and Design
Schools  (ACUADS)  Conference  2016.  ACUADS,  2016,  pp.  1–
## 14.
[12] P.  Morville  and  J.  Callender,  “Search  patterns:  design  for
discovery.” O’Reilly Media, Inc., 2010.
[13] C.  Rohrer,  “When  to  use  which  user-experience   research
methods,” Nielsen Norman Group, 2014.
[14] T.  Russell-Rose  and  T.  Tate,  Designing  the  search  experience:
The information architecture of discovery. Newnes, 2012.
[15] J. J. Maldonado, J. Siguencia, and J. P. Carvallo, “Repositorios
educativos:  Estudio  de  la  situación  actual  y  estrategia  para
mejorar su  uso  efectivo  en  las  universidades  ecuatorianas,”
Versión Abierta Español-Portugués, no. 85, 2015.
[16] J.  Bacca,  A.  Noguera,  S.  Baldiris,  J.  Guevara,  and  R.  Fabregat,
“Sistema de procesamiento distribuido como soporte al módulo
de    búsqueda    sobre    repositorios    de    objetos    virtuales    de
aprendizaje  para  la  plataforma  de  e-learning  dotlrn,”  Revista
Tekhnê, vol. 8, no. 1, pp. 69–73, 2011
[17] J. Atenas and L. Havemann, “Quality assurance in the open: an
evaluation   of   OER   repositories,”   INNOQUAL:   The
International  Journal  for  Innovation  and  Quality  in  Learning,
vol. 1, no. 2, pp. 22–34, 2013
[18] J. Nielsen, “How many test users in a usability study,” Nielsen
Norman Group, vol. 4, no. 06, 2012.
[19] J. Rubin and D. Chisnell, Handbook of  usability testing: how to
plan,  design  and  conduct  effective  tests. John  Wiley  &  Sons,
## 2008.
[20] C.  Terrasse,  B.  Marinova,  W.  Greller,  M.  Bitter-Rijpkema,  and
U. Schwertel, “Opening up! how to take full advantage of open
educational resources (OER) for management education,” 2012.
[21] S.  Hatzipanagos  and J. Gregson, “The role of open access and
open  educational  resources:  A  distance  learning  perspective,”
ICEL-2014  Hosted  by  The  Federico  Santa  María  Technical
University Valparaiso Chile, p. 265, 2014.
[22] Calvo-Elizondo,  A.,  “User  Experience  Design  Strategies:
Improving  the  Requirement-Gathering  Process  for  E-learning
Products   on   Learning   Management   Systems   Through   UX
Workshops”  12th  International  Technology,  Education  and
Development   Conference   (INTED   2018)   Valencia,   Spain.
March, 2018 pp. 6417-6423.
[23] J.  Sauro  and  J.  R.  Lewis,  Quantifying  the  user  experience:
Practical statistics for user research. Morgan Kaufmann, 2016
[24] J.  Nielsen,  “Quantitative  studies:  How  many  users  to  test,”
Alertbox, June, vol. 26, p. 2006, 2006
[25] R. De Santiago and A. Raabe, “Architecture for learning objects
sharing among learning institutions lop2p,” IEEE Transactions
on Learning Technologies, vol. 3, no. 2, pp. 91–95, 2010.
[26] S.  M.  Baldiris,  J.  L.  Bacca,  A.  N.  Rojas,  J.  C.  Guevara,  and  R.
Fabregat,  “Lorse:  Intelligent  meta-searcher  of  learning  objects
over  distributed  educational  repositories  based  on  intelligent
agents,” in 2011 Frontiers in Education Conference (FIE). IEEE,
2011, pp. F1E–1.
[27] H. Imran, M. Belghis-Zadeh, T.-W. Chang, S. Grafet al., “Plors:
a  personalized  learning  object recommender system,” Vietnam
Journal of Computer Science, vol. 3, no. 1, pp. 3–13, 2016.
[28] C. De Medio, F. Gasparetti, C. Limongelli, F. Sciarrone, and M.
Temperini,  “Course-driven   teacher   modeling   for    learning
objects  recommendation  in  the  moodle  LMS,”  in  Adjunct
Publication   of   the   25th   Conference   on    User   Modeling,
Adaptation and Personalization. ACM, 2017, pp. 141–145.
[29] J.  Solís,  M.  Chacón-Rivas,  and  C.  Garita,  “Agente  híbrido
recomendador de objetos de aprendizaje,” in IX Latinoamerican
Conference  on  Learning  Objects  and  Technologies,  2014,  pp.
## 290–301.
## [30] F.  A.  Dorça,  R.  D.  Araujo,  V.  C.  De  Carvalho,  D.  T.  Resende,
and  R. G. Cattelan,  “An automatic and dynamic approach for
personalized  recommendation  of  learning  objects  considering
students learning styles: an experimental analysis,” Informatics
in education, vol. 15, no. 1, p. 45, 2016.
[31] H.  Drachsler,  K.  Verbert,  O.  C.  Santos,  and  N.  Manouselis,
“Panorama  of  recommender  systems  to  support  learning,”  in
Recommender systems handbook. Springer, 2015, pp. 421–451.
[32] J.  K.  Tarus,  Z.  Niu,  and  G.  Mustafa,  “Knowledge-based
recommendation:   a   review   of   ontology-based   recommender
systems  for  e-learning,” Artificial Intelligence Review, vol. 50,
no. 1, pp. 21–48, 2018.
[33] M.  K.  Khribi,  M.  Jemni,  and  O.  Nasraoui,  “Recommendation
systems   for   personalized   technology-enhanced  learning,”  in
Ubiquitous  learning  environments  and  technologies. Springer,
2015, pp. 159–180.
[34] J. K. Tarus, Z. Niu, and A. Yousif, “A hybrid knowledge-based
recommender  system  for  e-learning  based  on  ontology  and
sequential  pattern  mining,”  Future  Generation  Computer
Systems, vol. 72, pp. 37–48, 2017.
[35] M.    Erdt,    A.    Fernandez,  and  C.  Rensing,  “Evaluating
recommender   systems   for   technology   enhanced   learning:   a
quantitative   survey,”   IEEE   Transactions   on   Learning
Technologies,  vol. 8,  no. 4, pp. 326–344, 2015.[35] A. Klašnja-
Milićević,  M.  Ivanović,  and  A.  Nanopoulos,  “Recommender
systems in e-learning environments: a survey of the state-of-the-
art and possible extensions,” Artificial Intelligence Review, vol.
44, no. 4, pp. 571–604, 2015.
