> **METADATA (NEXUS SEMANTIC TAGS)**: [design, color-theory, psychology, ux, academic-research]



User Experience and Efficiency for
## Semantic Search Engine

## Arooj Fatima, Cristina Luca, George Wilson
## Anglia Ruskin University
Arooj.fatima@anglia.ac.uk, Cristina.Luca@anglia.ac.uk, George.Wilson@anglia.ac.uk


Abstract-  Search  tools  are  essential  for  an  information  system.
Being  syntax  based,  the  existing  search  engines  have  a  number
of  limitations  in  particular  their  difficulty  in  returning  relevant
results.  Typically  these  limitations  are  partly  mitigated  through
use of various customised techniques in order to provide the best
possible  user  experience.  Unlike  conventional  search  engines,  a
semantic  web  search  engine  attaches  meanings  to  key  words.
One of the biggest challenges for such a semantic search engine
is  to  maintain  the  standard  of  user  experience  while  serving  its
purpose  of  finding  relevant  data  with  meanings.  A  semantic
search tool needs to both link meanings to search keywords and
be  able  to  efficiently  retrieve  information.  The  purpose  of  this
work  is  to  investigate  the  techniques  that  can  be  used  for
efficient   information   retrieval   and   effective   user   experience
within the context of a semantic search engine. We propose two
algorithms for query optimisation and ontology crawler.

## I. INTRODUCTION
Internet users use search engine tools to help them find data
from  a  vast  repository  of  web  pages.  Most  current  search
engines use syntax based search or full-text search methods to
extract   data.   Full-text   searching   is   a   technique   where   a
computer  program  matches  terms  in  a  search  query  with
terms in individual documents in a database [4].
The  inherent  limitations  of  syntax  based  search  engines
(often implemented in combination to the full-text search) are
often    masked    through    use    of    various    compensating
techniques  such  as  page  ranking  based  on  relevancy  factor
and  content  score  [15].  The  limitations  of  a  syntax-based
search  engine  include  high  recall  with  low  precision  (e.g.
thousands of results in response to one or few keywords), low
or  no  recall  (when  there  are  no  relevant  results),  and  high
sensitivity of results to vocabulary [2]. A semantic web is the
optimised  solution  to  these  challenges.  Many  organisations
such  as  gov.uk  and  bbc.co.uk  already  routinely  use  semantic
data but their significance in terms of the potential to improve
semantic  searches  is  only  now  of  growing  interest  to  the
database and Internet research communities.
Whilst the semantic web is already used in practice, there is
still  a  need  for  a  strong  semantic  search  engine  to  utilise  the
full  potential  of  that  web.  Semantic  search  engines  such  as
Swoogle         (swoogle.umbc.edu)         and         Duckduckgo
(duckduckgo.com/)  have  taken  this  approach  but  their  user
experience  is  currently  sub-standard  to  that  of  conventional
search engines.
Achieving a satisfactory User Experience comparable with
current user expectations is one of the main challenges facing
the   development   (and   acceptance)   of   a   semantic   search
engine.   A   query   engine   can   only   work   effectively   if   it
actually knows what to search for. The user-friendly interface
of  current  search  engines  is  achieved  through  implementing
tools to serve this purpose and a Semantic Web search engine
necessarily  needs  to  maintain  the  same  standard  of  user
experience while working with a different data structure.
In     a     conventional     programming     environment     the
developers  will  write  queries  based  on  knowledge  of  the
search criteria, data structure (e.g. relational database) and the
query  language.  A  truly  optimised  semantic  search  however
requires a search engine that can write itself queries to be fed
back into the query engine. This means that a query language
alone  will  not  benefit  a  search  system  but  rather  is  highly
dependent upon the base data structure it works upon and the
top-level  system  interacting  with  it.  This  functionality  must
not  be  at  the  expense  of  the  qualities  of  a  conventional  end-
user  interface  and  for  example  should  include  user-friendly
features  such  as  auto-suggest  and  auto-correct  functionality
[13]  and  an  ontological  classification  of  words,  possibly  by
query-tagging [14].
This work investigates how to enhance the user experience
for   a   semantic   search   engine   user   and   we   propose   a
framework  that  facilitates  an  effective  semantic  search  while
keeping  the  standard  of  user-friendliness  and  improving  user
satisfaction.   We   start   by   looking   at   the   semantic   core
technologies  necessary  for  semantic  information  retrieval,
namely   Resource   Description   Frameworks   (RDFs)   and
Ontologies. Secondly the main factors that assure a good user
experience will be evaluated. Thirdly the various features that
offer  an  effective  user  experience  will  be  described.  Finally
we propose a framework for information retrieval to enhance
the user experience.
## II. R
## ELATED WORKS
The  idea  of  our  proposed  system  is  closely  related  to  the
approach  proposed  by  [10]  and  is  a  move  towards  ontology-
based   information   retrieval   where   those   authors   discuss
effective  ranking  and  semantic  search  techniques.  However,
their work is domain specific while the scope of our proposed
framework  is  a  semantic  search  engine  where  we  explore  all
## 924978-1-4799-5183-3/14/$31.00 '  2014 IEEE

aspects  affecting  the  usability  and  reliability  of  a  semantic
search engine.
## III. A
## NALYSIS OF SEMNATIC WEB DATA STRUCTURE
Two  principal  aspects  of  a  semantic  data  structure  are
relevant here; namely data storage (via RDF) and Ontologies
(or vocabularies).

## A. Data Language
There  are  various  techniques  used  to  store  data,  including
as   discrete   files,   structured   files   as   Extensible   Markup
Language (XML), and use of relational databases. Whilst the
semantic  web  has  an  architectural  scope  that  varies  from  the
standard  web  architecture,  it  optimally  needs  a  different
database  structure.  The  core  of  the  semantic  web  is  built  on
the RDF model [16]. RDF is both a language and a structure,
rather like XML but is far advanced and has a totally different
functionality. RDF describes a resource as a triple in the form
of  subject,  predicate  and  object.  An  object  in  one  predicate
can be subject of another predicate implementing the concept
of  linked  data  in  a  schema  free  structure  [1].  The  concept  of
linked data makes the scope of the semantic web far broader
than the standard web, but much research is needed as to how
the querying of such linked data can be efficiently optimised
## [3].

## B. Ontologies
Ontology   describes   how   something   exists,   and   in   a
semantic   web   context   this   refers   to   instances,   classes,
attributes  and  their  relations  [27].  One  view  of  ontology  is
that   it   is   a   vocabulary   that   saves   meanings   of   data
unambiguously.
Computers  do  not  have  a  vocabulary  like  people  do  hence
they  are  not  able  to  relate  various  terms  to  each  other.
Ontology  defines  entities  and  their  relations  that  can  be  used
by queries and assertions for keyword mapping.
## IV. C
## HALLENGES FOR A SEMANTIC WEB SEARCH ENGINE
Whilst   the   semantic   web   search   engine   deals   with   a
different  data  structure  and  searching  style,  the  standard  of
user  experience  must  be  maintained.  This  is  necessary  to
fulfill  the  promise  of  searching  relevant  data  matched  with
semantics to ensure the highest return accuracy.
We  discussed  in  [6]  the  multiple  challenges  faced  by  a
semantic  search  engine  i.e.  user  experience,  efficiency,  page
ranking,  scalability,  cost  effectiveness.  The  focus  of  this
paper  is  to  explore  this  challenge  of  effectively  merging  a
positive  user  experience  with  an  effective  semantic  search
engine interface.

## A. Effective User Interface
A friendly user interface is the most important feature that
will  enhance  the  user  experience.  Search  engines  such  as
Google,  Bing  and  Yahoo  have  all  been  through  a  number  of
improvements  in  order  to  provide  end-users  with  the  best
possible user experience. Even if the results are incomplete or
sometimes  not  accurate  due  to  syntax-only  based  search
algorithms,  end  users  still  adhere  to  these  search  engines  for
the  sake  of  a  good  perceived  user  experience.  Improvements
to  the  end-user  interface  of  a  semantic  query  search  engine
needs     substantial     development     so     that     poor     input
representation    of    a    query    will    automatically    suggest
corrections  for  spelling  mistakes  and  poor  grammar,  and  of
course find the best matched results with a high accuracy.

## B. Efficiency
An   efficient   (i.e.   fast   in   this  context)  search  engine’s
performance depends upon the size of data to be matched, the
request  time  to  the  web  servers  and  the  associated  response
time.  For  a  semantic  web  query  execution  time  also  depends
on  factors  such  as  delays  caused  by  looking  up  Uniform
Resource  Locators  [8],  efficient  support  for  indexing  large-
scale  data  [7],  and  dealing  with  query  termination  problem
## [9].
## V. F
## EATURES OF AN EFFECTIVE USER EXPERIENCE
In  order  to  be  successful  a  search  engine  aims  to  generate
user  traffic  and  in  doing  so  generate  revenue.  The  principal
technique  to  achieve  this  is  to  provide  the  best  possible  user
experience, and a good user experience mainly depends upon
a friendly user interface.

A. Easy to use Search Interface
An  easy  to  use  search  interface  is  one  that  intuitive  to  use
and ‘makes sense’ to average users so that they do not spend
time thinking how to use it.

## B. Understanding User Query
In  a  traditional  information  retrieval  users  understand  the
structure  of  the  system  and  have  some  training  in  the  art  of
phrasing   queries   [12]   and   in   a   domain   specific   search
environment, the search tool expects specific types of queries.
In contrast the users of a web search engine need do not need
to  care  about  any  structuring  of  the  data  and  they  always
expect the search engine to understand what they are looking
for.
For  an  effective  communication  between  the  user  and  the
search    engine    a    friendly    user-interface    facilitates    an
understanding of user requirements for the data, including (i)
spell  checking  (ii)  grammar  correction  (if  possible)  and  (iii)
auto-suggest.

## C. High Relevancy
The relevancy of search results is one of the main features
of  an  effective  user  experience.  Syntax  based  search  engines
may  find  results  with  a  high  precision  but  may  be  with  low
accuracy as they match the search term with the content in the
web  documents  without  understanding  the  meaning  of  the
data.  The  user  satisfaction  is  achieved  through  use  of  meta-
tags and page ranking (google.com is a good example). These
techniques do not assure the relevancy if the search terms are
## 925



ambiguous (e.g. jaguar {animal or vehicle}, April {month or
name}) or have synonyms (e.g. leprosy and Hansen disease).

D. Uncluttered results
A  good  user  interface  should  have  an  uncluttered  search
and  results  interface.  Results  should  be  arranged  and  ranked
(if required). If there is a long list of results, the results should
be  divided  into  pages.  Results  should  portray  a  brief  and
succinct idea about the page.

## VI. A
## PROPOSED INFORMATION RETRIEVAL SYSTEM
This paper is based on the framework that we proposed in
[6]  but  only  focuses  on  the  parts  of  the  framework  that  are
directly  or  indirectly  involved  at  user  level  experience.  The
paper  expands  the  basic  information  retrieval  system  and
elaborates the core functionality that facilitates a healthy user
experience whilst dealing with a different data structure. The
framework  that  we  propose  for  information  retrieval  for  a
semantic   search   engine   that   fulfils   the   requirements   of
keywords  tagging  whilst  retaining  user-friendliness  is  shown
in Figure 1.

## A. User Interface
The starting point for a search interface is to get a query or
search   keyword/s   from   the   end   user   and   endeavour   to
understand  what  the  user  is  looking  for.  Existing  search
engines  (e.g.  Google.com)  use  auto-correct,  autosuggest  and
predictions  tools  to  save  time  and  offer  a  friendly  interface.
Common  associated  techniques  include  caching  a  mistake,
repeat   favourite   search,   relevant   searches,   and   popular
searches.  However  these  techniques  assume  the  user  entered
the data correctly, which is a major drawback. For example a
search on “fuchsia” might be spelt as “fuschia” and the search
engine may remember the wrong spelling (Figure 2).
This   paper   proposes   a   friendly   user   interface   whose
interface supports the conventional approaches to correct and
prompt  alternative  queries  (for  non-sensical  or  ambiguous
queries)   but   adopts   a   different   approach   in   smartly   re-
phrasing  the  keywords  based  on  its  own  understanding.  The
proposed  framework  introduces  the  term  ‘Bag  of  Keywords’
that  will  be  a  repository  for  cached  keywords.  The  user
interface  gets  the  entered  keywords  and  passes  them  to  the
query  optimiser.  If  the  keywords  make  sense  a  response  is
sent back to the user interface to be displayed to the user. The
response may be a plain set of results or a set of suggestions.
If   the   user   interface   receives   more   than   one   suggestion
against  a  single  keyword  (which  means  the  keyword  is
ambiguous) then it provides the option of a further advanced
search where the user can tag each search term from a list of
related  ontologies  available  for  that  term.  For  example  for  a
search  like  “java  and  apple”  the  user  can  tag  “java”  as
{language or place} and “apple” as {fruit or device}.

## Ontology
## Crawler
## User Interface
## Ontology Indexer
## Ontology
## Cache
Send tagged
keywords to
query
formatter
## Query Optimiser
## Online Ontology Stores
Bag of
terms/DB
## Ontology
## API
Fig. 1. Framework for Information Retrieval
## 926

B. Bag of Keywords
The  ‘Bag  of  Keywords’  term  is  used  by  the  proposed
system   for   a   multi   purpose   repository   of   keywords   it
manages.  The  repository  varies  from  conventional  keyword
caching in many ways:
1) It   contains   keywords   grabbed   from   authenticated
dictionaries and vocabularies instead of caching user data.
2) All  keywords  will  be  indexed  (e.g.  alphabetically)  for
efficient retrieval.
3) All keywords will be saved with their linked ontologies
references hence assuring faster retrieval of tags to bind with
keywords.
4) All keywords will be saved with attribute tags to define
the  type  of  the  keywords  (e.g.  nouns,  verbs)  and  type  of
relation   it   can   constitute.   This   will   help   to   constitute   a
relationship  among  the  keywords  in  a  sentence  for  query
formation.
The   technique   of   keyword   caching   requires   memory
storage  that  indeed  affects  the  cost  of  deployment,  but  for  a
search   engine   it   is   a   normal   practice   to   consume   large
memory  space  to  cache  data  and  keywords.  Actually  saving
keywords  from  the  user  resources  acquires  more  space  than
caching authenticated keywords from particular resources e.g.
caching  a  keyword  detail  once  from  an  authorised  resource
takes  much  less  space  then  caching  from  hundreds  of  user
resources   and   then   finding   the   highest   results.   Yet   this
technique  requires  effort  to  manually  enter  resources  to  grab
keywords  and  a  way  to  deal  with  undefined  keywords  is
needed.

## C. Query Optimiser
A  major  challenge  for  a  semantic  search  engine  is  to
translate  a  natural  language  query  to  a  search  query  that  is
understandable  by  the  query  engine.  The  processing  of  the
semantic  web  search  query  is  different  from  other  queries
because  it  is  not  pre-written  by  program  developers  that
simply  match  the  search  criteria  with  different  pre-defined
data  fields  (as  in  relational  database)  or  nodes  (like  XML).
Instead it dynamically writes queries using various algorithms
at initial query runtime.
In  the  present  work  the  authors  propose  a  facility  to  tag
search  terms  (keywords)  with  related  ontology.  A  similar
approach has been experimented by [11] where they modelled
some test inputs entered by user with related ontology but it is
not  clear  that  how  the  input  is  supposed  to  be  entered.  End
users  are  rarely  specific  while  writing  search  keywords  and
always  expect  the  search  engine  to  understand  what  they  are
looking for. We propose a system in this paper that takes care
of this issue by introducing the ‘Query Optimiser’.
The  Query  Optimiser  scans  the  keywords  entered  by  the
end  user  and  checks  if  it  can  understand  the  query.  If  the
entered  search  terms  do  not  make  complete  sense  to  the
optimiser  it  checks  for  grammatical  errors  first  and  suggests
some options to the user if required.
Algorithm  1  details  the  procedure  used  by  the  Query
Optimiser for keyword tagging.

## Algorithm 1   Query Optimisation
Require: sentence
-   words
## 0..n
= split(sentence)
-   for keyword=0 to n do
-        result  = match(words
keyword
## )
-        count  = count_match(result)
-              if count > 1 then
-                   for i=0 to count do
-                            suggestions
words,i
= result
i

-         end for
-   else
-          if count == 1 then
-                        suggestions
words,i
= null
-          end if
-            else
-                  if count==0   then
-                         // deal un-known keywords
-                  end if
-            end if
-       end for
-   return suggestions

Explanation of Algorithm 1:
The   query   optimiser   algorithm   requires   a   user   query
(sentence)  as  input.  At  line  1,  it  calls  a  function  split()  to  get
individual  keywords  (in  case  the  user  entered  two  or  more
search  terms)  and  saves  them  in  an  array  i.e.  words
## 0..n
## .  The
algorithm  then  loops  through  all  the  keywords  and  matches
them with the data from the ‘Bags of Keywords’ (line 3) and
evaluates  if  the  keyword  is  defined  and  not  ambiguous.  If
count_match()  result  (at  line  4)  is  greater  than  1  then  the
keyword is assumed to be ambiguous. If an ambiguous word
found,  it  generates  a  list  of  suggestions  (line  7)  from  related
ontologies  (e.g.  for  “jaguar”  for  example  two  examples  are
proposed {vehicle, animal}) and a response is sent to the user
interface  (line  19).  The  user  interface  prompts  the  user  to
Fig. 2. Example of Caching wrong spellings
## 927

choose  the  exact  keyword  he/she  is  looking  for.  To  map  and
bind  keywords  with  related  ontologies,  the  query  optimiser
uses the ‘Ontology API’ tool from ‘Ontology Processor’.

## D. Ontology Processor
As discussed earlier, for a good user experience, efficiency
of   the   system   is   the   basic   requirement.   The   ontology
processor plays a vital role for efficient information retrieval
and  supports  the  process  of  query  optimisation.  It  will  help
the query optimiser to suggest tags to query keywords where
tags   will   have   associated   ontologies.   The   retrieving   of
ontologies  from  an  online  store  or  library  (every  time  a  user
enters  a  search  input)  in  order  to  tag  a  word  is  a  lengthy
process   that   will   have   a   cost   in   terms   of   efficiency.
Unavailability  or  slow  response  of  an  online  ontology  server
can  also  limit  the  functionality  of  the  search  engine.  To
overcome this issue, the proposed ontology processor consists
of three parts:
## 1. Ontology Crawler
The  objective  of  crawling  is  to  quickly  and  efficiently
gather  data.  The  ontology  processor  will  have  a  crawler
service,  which  regularly  updates  an  ontology  list  from  an
ontology  store  and  retains  a  cached  copy  of  the  online
ontologies.
Algorithm   2   shows   the   procedures   used   for   crawling
ontologies and caching a copy on the server:

## Algorithm 2   Ontology Crawler
Require: ontology_list, cache_path
-   records = count(ontology_list)
-   listÅnew queue
-   while record + 1 < records do
-        file_exists = check_if cached(list
record
## ,cache_path)
-        if  file_exists == 1 then
-              creation_date= get_creation_date(list
record
## )
-              modify_date= check_modify_date(list
record
## )
-              if modify_date >creation_date then
-          file = fetch_revision(list
record
## )
-          update_index(file)
-          update_cache(file)
-            else
-           // do nothing
-            end if
-       else
-            file = fetch_file(list
record
## )
-            insert_index(file)
-            save_cache(file)
-       end if
-   end while

Explanation of Algorithm.2:
The proposed system retains a list of ontologies from
online resources. The Ontology Crawler requires the saved
ontology list and path of the cache where ontologies are
saved. The algorithm loops through the ontology list (from
line 3 to line 20) to check if it is already cached with the
updated copy. The method at line 4 checks if an ontology file
exists or not. If the file exists it checks for the creation date
(at line 6) and at the same time it queries the modified date by
sending HTTP request to online repository. If the modified
date is greater than the creation date (i.e. the cached copy is
older than the live one), it fetches the updated version from
online repository (at line 9) and updates the indexing record
(line 10). If the ontology is not already cached, it is fetched
from the online server (line 16) and generates an index for it
(at line 17) and saves a copy in cache.
- API Service
The second part of the ontology processor will work like an
API (Application Program Interface) that will receive key
words from the Query Optimiser and return matching tags
with associated ontologies as a response.
## 3. Ontology Indexer
Indexing  is  a  technique  to  speed  up  the  search  tasks.  The
quality  of  search  experience  depends  upon  the  speed  of
informal  retrieval.  Indexing  speeds  up  the  process  though  at
the cost of more storage space.
For  efficient  information  retrieval,  the  ontology  indexer
stores  information  about  cached  ontologies  (on  the  server).
Whilst  ontologies  are  indexed,  it  substantially  speeds  up  the
process of data retrieval.
## VII. C
## ONCLUSION
The  semantic  web  is  a  flourishing  technology  and  its
implementations  are  rapidly  growing.  The  feasibility  of  the
core idea of the semantic web is gaining acceptance and this
acceptance  is  opening  many  research  areas  in  the  effective
use  of  semantic  technologies.  A  semantic  search  engine  can
be the best proof of the actual concept of the semantic web. In
practice  users  of  the  semantic  web  need  some  search  tools
that can be used by common web users instead of developers
or  technical  people.  To  develop  a  search  tool  for  the  end
users, we need to cope with the challenge of an effective user
interface and efficient data retrieval. The proposed framework
in this paper assures an effective user interface that efficiently
retrieves   semantic   data.   Future   work   will   produce   an
implementation  of  the  proposed  system  and  its  integration
with query formatter.

## R
## EFERENCES
[1] S.  Sakr  and  G.  Al-Nymat,  ”Relational  processing  of  RDF  queries:  a
survey”, ACM SIGMOD Record, vol. 38, issue 4, Dec. 2009, pp. 23-28,
doi:10.1145/1815948.1815953
[2] G.  Antoniou,  F.  V.  Harmelen,  “A  Semantic  Web  Primer”,  2
nd
## Edition.
London: MIT Press, 2008.
[3] M.  Arenas  and  J.  Perez,  “Querying  the  Semantic  Web  Data  with
SPARQL”, Proc.  of  the  thirtieth  ACM  SIGMOD-SIGACT-SIGART
symposium  on  Principles  of  database  systems  (PODS  11),  ACM,  New
York, NY, USA, 2011 pp. 305-316, doi:10.1145/1989284.1989312.
[4] J.  Beal,  “Weaknesses  of  Full  text  search”,  The  Journal  of  Academic
Librarianship,    vol.    34,    Number    5,    2008,    pp.    438-444.    doi:
http://dx.doi.org/10.1016/j.acalib.2008.06.007.
[5] D. Dicheva, R. Mozoguchi and J. Geer, Semantic Web Technologies for
e-learning, Amsterdam:IOSpress, 2009.
## 928

[6] A.  Fatima,  C.  Luca,  G.  Wilson,  “A  New  Framework  for  a  semantic
search Engine”, Accepted at UKSIM, 2014.
[7] L.  Chang,  W.  Haofen,  Y.    Yong  and  X.  Linhao,  “Towards  Efficient
SPARQL   Query   Processing   on   RDF   Data”,   Tsinghua   Science   &
Technology,     vol.     15,     issue     6,     Dec.     2010,     pp.     613-622.
doi:10.1016/S1007-0214(10)70108-5.
[8] O. Harting and F. Huber, F., “A main memory index structure to query
linked  data”.  Proc.  4
th
Linked  Data  On  the  Web  (LDOW11),  March
## 2011.
[9] O.  Harting  and  J.  Freytag,  J  “Foundations  of  traversal  based  query
execution over linked data”, Proc. 23rd ACM conference on Hypertext
and social media (HT '12). ACM, New York, NY, USA, 2012, pp. 43-
52, doi=10.1145/2309996.2310005.
[10] S.  Kara,  Ö.  Alan,  O.  Sabuncu,  S.  Akpınar,  N.  K.  Cicekli  and  F.  N.
Alpaslan,    “An    ontology-based    retrieval    system    using    semantic
indexing”, Information  Systems,  vol.  37,  issue  4,  June  2012,  pp.  294-
- doi:10.1016/j.is.2011.09.004.
[11] M. Shekhar and RA. K. Saravanaguru, “A case study on semantic web
search  using  ontology  modeling”,  International  journal  of  engineering
and technology, vol. 5, no. 3, 2013, pp. 2342-2348, ISSN 0975-4024.
[12] C. D. Manning, P. Raghavan, H. Schütze, “Introduction to Information
## Retrieval”, Cambridge: Cambridge University Press, 2009
[13] A.  Latif,  M.T.  Afzal,  P.  Hoefler,  A.U.  Saeed,  and  K.  Tochtermann,
“Turning  keywords  into  URIs:  simplified  user  interfaces  for  exploring
linked data”, Proc.  of  the  2nd  International  Conference  on  Interaction
Sciences:  Information  Technology,  Culture  and  Human (ICIS  '09).
ACM,     New     York,     NY,     USA,     2009     pp.     76-81.     Doi:
http://doi.acm.org/10.1145/1655925.1655939.
[14] M.  Manshadi  and  X.  Li,  ”Semantic  tagging  of  web  search  queries”,
Proc.  of  the  Joint  Conference  of  the  47th  Annual  Meeting  of  the  ACL
and  the  4th  International  Joint  Conference  on  Natural  Language
Processing  of  the  AFNLP:  vol.  2,  2009,  pp.  861-  869,  ISBN:  978-1-
## 932432-46-6.
[15] M. P. Selvan, C. A. Sekar and P. A. Dharshini, “Survey on Web Page
Ranking       Algorithms”,       International       Journal       of       Computer
Applications,  vol.  41,  no.19,  Published  by  Foundation  of  Computer
Science, March 2012, doi: 10.5120/5646-7764.
[16] F.  Manola  and  E.  Miller,  “RDF  Primer”,  W3C  Recommendation,  Feb.
## 2004.


## 929