import Docs from '../../../../components/Docs/Docs'
import Highlight from 'react-highlight.js'


export default () => {
    return(
        <Docs>
            <div className="container">
                <h1>Динамические маршруты API</h1>

Маршруты API поддерживают динамические маршруты и следуют тем же правилам именования файлов, которые используются для <span className="spanTag">pages</span>.
<p>Например, маршрут API <span className="spanTag">pages/api/post/[pid].js</span> имеет следующий код:</p>


<Highlight language="javascript">
    {`export default (req, res) => {
  const {
    query: { pid },
  } = req

  res.end('Post: \${pid}')
}`}
</Highlight>

Теперь, запрос <span className="spanTag">/api/post/abc</span> будет реагировать с текстом: <span className="spanTag">Post: abc</span>.

<h3>
    Индексировать маршруты и маршруты динамического API
</h3>

Очень распространенный шаблон RESTful - настроить такие маршруты:
<p className="list"> - <span className="spanTag">GET api/posts</span> - получает список сообщений, возможно, с разбивкой на страницы</p>
<p className="list"> - <span className="spanTag">GET api/posts/12345</span> - получает идентификатор поста 12345</p>


Мы можем смоделировать это двумя способами:
<p> - Опция 1:</p>
<p className="list"> - <span className="spanTag">/api/posts.js</span></p>
<p className="list"> - <span className="spanTag">/api/posts/[postId].js</span></p>
<p> - Вариант 2:</p>
<p className="list"> - <span className="spanTag">/api/posts/index.js</span></p>
<p className="list"> - <span className="spanTag">/api/posts/[postId].js</span></p>

Оба эквивалентны. Третий вариант использования только <span className="spanTag">/api/posts/[postId].js</span> недействителен, поскольку динамические маршруты (включая маршруты для приема всей почты домена - см. Ниже) не имеют <span className="spanTag">undefined</span> состояния и <span className="spanTag">GET api/posts</span> не будут соответствовать <span className="spanTag">/api/posts/[postId].js</span> ни при каких обстоятельствах.


<h3>Поймать все маршруты API</h3>

Маршруты API можно расширить, чтобы охватить все пути, добавив три точки (...) в скобки. Например:
<p className="list"> - <span className="spanTag">pages/api/post/[...slug].js</span> спички <span className="spanTag">/api/post/a</span>, но также <span className="spanTag">/api/post/a/b</span>, <span className="spanTag">/api/post/a/b/c</span> и так далее.</p>
<div className="note"><strong>Примечание.</strong> Вы можете использовать другие имена <span className="spanTag">slug</span>, например:<span className="spanTag">[...param]</span></div>
 

Соответствующие параметры будут отправлены <span className="spanTag">slug</span> на страницу как параметр запроса ( в примере), и это всегда будет массив, поэтому путь <span className="spanTag">/api/post/a</span> будет иметь следующий <span className="spanTag">query</span> объект:
<Highlight language="json">
    {`{ "slug": ["a"] }`}
</Highlight>

И в случае <span className="spanTag">/api/post/a/b</span>, и любого другого совпадающего пути к массиву будут добавлены новые параметры, например:
<Highlight language="json">
    {`{ "slug": ["a", "b"] }`}
</Highlight>

Маршрут API для <span className="spanTag">pages/api/post/[...slug].js</span> может выглядеть так:
<Highlight language="javascript">
    {`export default (req, res) => {
  const {
    query: { slug },
  } = req

  res.end('Post: \${slug.join(', ')}')
}`}
</Highlight>

Теперь, запрос <span className="spanTag">/api/post/a/b/c</span> будет реагировать с текстом: <span className="spanTag">Post: a, b, c</span>.

<h3>Необязательный перехват всех маршрутов API</h3>
Поймать все маршруты можно сделать необязательными, включив параметр в двойные скобки (<span className="spanTag">[[...slug]]</span>).
<p>
    Например, <span className="spanTag">pages/api/post/[[...slug]].js</span> будет соответствовать <span className="spanTag">/api/post</span>, <span className="spanTag">/api/post/a</span>, <span className="spanTag">/api/post/a/b</span> и так далее.
</p>

<p>
    Основное различие между маршрутами <span className="spanTag">catch all</span> и <span className="spanTag">optional catch all</span> заключается в том, что с <span className="spanTag">optional</span> маршрут без параметра также сопоставляется (<span className="spanTag">/api/post</span> в примере выше).
</p>
Эти <span className="spanTag">query</span> объекты являются следующими:
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
 - <span className="spanTag">pages/api/post/create.js</span> - Будет соответствовать <span className="spanTag">/api/post/create</span>
</p>
<p className="list">
 - <span className="spanTag">pages/api/post/[pid].js</span> - Будет соответствовать <span className="spanTag">/api/post/1</span>, <span className="spanTag">/api/post/abc</span> и т.д. Но не <span className="spanTag">/api/post/create</span>
</p>
<p className="list">
 - <span className="spanTag">pages/api/post/[...slug].js</span> - Будет соответствовать <span className="spanTag">/api/post/1/2</span>, <span className="spanTag">/api/post/a/b/c</span> и т.д. Но не <span className="spanTag">/api/post/create</span>,<span className="spanTag">/api/post/abc</span>
</p>
            </div>
        </Docs>
    )
}