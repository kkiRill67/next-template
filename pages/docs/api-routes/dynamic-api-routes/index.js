import Docs from '../../../../components/Docs/Docs'
import Highlight from 'react-highlight.js'


export default () => {
    return(
        <Docs>
            <div className="container">
                <h1>Динамические маршруты API</h1>

Маршруты API поддерживают динамические маршруты и следуют тем же правилам именования файлов, которые используются для pages.
<p>Например, маршрут API pages/api/post/[pid].js имеет следующий код:</p>


<Highlight language="javascript">
    {`export default (req, res) => {
  const {
    query: { pid },
  } = req

  res.end('Post: \${pid}')
}`}
</Highlight>

Теперь, запрос /api/post/abc будет реагировать с текстом: Post: abc.

<h3>
    Индексировать маршруты и маршруты динамического API
</h3>

Очень распространенный шаблон RESTful - настроить такие маршруты:
<p className="list"> - GET api/posts - получает список сообщений, возможно, с разбивкой на страницы</p>
<p className="list"> - GET api/posts/12345 - получает идентификатор поста 12345</p>


Мы можем смоделировать это двумя способами:
<p> - Опция 1:</p>
<p className="list"> - /api/posts.js</p>
<p className="list"> - /api/posts/[postId].js</p>
<p> - Вариант 2:</p>
<p className="list"> - /api/posts/index.js</p>
<p className="list"> - /api/posts/[postId].js</p>

Оба эквивалентны. Третий вариант использования только /api/posts/[postId].jsнедействителен, поскольку динамические маршруты (включая маршруты для приема всей почты домена - см. Ниже) не имеют undefinedсостояния и GET api/postsне будут соответствовать /api/posts/[postId].jsни при каких обстоятельствах.


<h3>Поймать все маршруты API</h3>

Маршруты API можно расширить, чтобы охватить все пути, добавив три точки ( ...) в скобки. Например:
<p className="list"> - pages/api/post/[...slug].jsспички /api/post/a, но также /api/post/a/b, /api/post/a/b/cи так далее.</p>
<div className="note"><strong>Примечание.</strong> Вы можете использовать другие имена slug, например:[...param]</div>
 

Соответствующие параметры будут отправлены slugна страницу как параметр запроса ( в примере), и это всегда будет массив, поэтому путь /api/post/aбудет иметь следующий queryобъект:
<Highlight language="json">
    {`{ "slug": ["a"] }`}
</Highlight>

И в случае /api/post/a/b, и любого другого совпадающего пути к массиву будут добавлены новые параметры, например:
<Highlight language="json">
    {`{ "slug": ["a", "b"] }`}
</Highlight>

Маршрут API для pages/api/post/[...slug].jsможет выглядеть так:
<Highlight language="javascript">
    {`export default (req, res) => {
  const {
    query: { slug },
  } = req

  res.end('Post: \${slug.join(', ')}')
}`}
</Highlight>

Теперь, запрос /api/post/a/b/cбудет реагировать с текстом: Post: a, b, c.

<h3>Необязательный перехват всех маршрутов API</h3>
Поймать все маршруты можно сделать необязательными, включив параметр в двойные скобки ( [[...slug]]).
<p>
    Например, pages/api/post/[[...slug]].jsбудет соответствовать /api/post, /api/post/a, /api/post/a/bи так далее.
</p>

<p>
    Основное различие между маршрутами catch all и optional catch all заключается в том, что с optional маршрут без параметра также сопоставляется ( /api/postв примере выше).
</p>
Эти query объекты являются следующими:
<Highlight language="json">
    {`{ } // GET '/api/post' (empty object)
{ "slug": ["a"] } // 'GET /api/post/a' (single-element array)
{ "slug": ["a", "b"] } // 'GET /api/post/a/b' (multi-element array)`}
</Highlight>

<h2>Предостережения</h2>
<p>
 - Предопределенные маршруты API имеют приоритет над динамическими маршрутами API, а динамические маршруты API перехватывают все маршруты API. Взгляните на следующие примеры:
</p>
<p className="list">
 - pages/api/post/create.js - Подойдет /api/post/create
</p>
<p className="list">
 - pages/api/post/[pid].js- Будет соответствовать /api/post/1, /api/post/abcи т.д. Но не/api/post/create
</p>
<p className="list">
 - pages/api/post/[...slug].js - Будет соответствовать /api/post/1/2, /api/post/a/b/c и т.д. Но не /api/post/create,/api/post/abc
</p>
            </div>
        </Docs>
    )
}