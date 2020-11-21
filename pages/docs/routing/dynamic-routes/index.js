import Docs from '../../../../components/Docs/Docs'
import Highlight from 'react-highlight.js'


export default () => {
    return(
        <Docs>
            <div className="container">
                <h1>Динамические маршруты</h1>
             
Определение маршрутов с использованием заранее определенных путей не всегда достаточно для сложных приложений. В Next.js вы можете добавить скобки к странице (<span className="spanTag">[param]</span>) для создания динамического маршрута (он же ярлыки URL-адресов, красивые URL-адреса и другие).

<p>
Рассмотрим следующую страницу <span className="spanTag">pages/post/[pid].js</span>:
</p>
<Highlight language="javascript">
    {`import { useRouter } from 'next/router'

const Post = () => {
  const router = useRouter()
  const { pid } = router.query

  return <p>Post: {pid}</p>
}

export default Post`}
</Highlight>

Любой маршрут, например <span className="spanTag">/post/1</span>, <span className="spanTag">/post/abc</span> и т.д., будет сопоставлен <span className="spanTag">pages/post/[pid].js</span>. Параметр согласованного пути будет отправлен на страницу в качестве параметра запроса и будет объединен с другими параметрами запроса.
<p>
Например, у маршрута <span className="spanTag">/post/abc</span> будет такой <span className="spanTag">query</span> объект:
</p>

<Highlight language="json">
    {`{ "pid": "abc" }`}
</Highlight>

<p>
 Точно так же у маршрута <span className="spanTag">/post/abc?foo=bar</span> будет следующий <span className="spanTag">query</span> объект:   
</p>

<Highlight language="json">
    {`{ "foo": "bar", "pid": "abc" }`}
</Highlight>

Однако параметры маршрута переопределяют параметры запроса с тем же именем. Например, у маршрута <span className="spanTag">/post/abc?pid=123</span> будет такой <span className="spanTag">query</span> объект:
<Highlight language="json">
    {`{ "pid": "abc" }`}
</Highlight>

Аналогичным образом работают несколько сегментов динамического маршрута. Страница <span className="spanTag">pages/post/[pid]/[comment].js</span> будет соответствовать маршруту, <span className="spanTag">/post/abc/a-comment</span> и ее <span className="spanTag">query</span> объект будет:
<Highlight language="json">
    {`{ "pid": "abc", "comment": "a-comment" }`}
</Highlight>

Примечание. Переходы на стороне клиента к динамическому маршруту (включая захват всех маршрутов) можно обрабатывать с помощью <span className="spanTag">next/link</span>. Прочтите нашу документацию о связывании страниц, чтобы узнать больше.

<h3>Поймать все маршруты</h3>

Динамические маршруты можно расширить, чтобы охватить все пути, добавив три точки (<span className="spanTag">...</span>) в скобки. Например:
<p className='list'>
 - <span className="spanTag">pages/post/[...slug].js</span> спички <span className="spanTag">/post/a</span>, но также <span className="spanTag">/post/a/b</span>, <span className="spanTag">/post/a/b/c</span> и так далее.  
</p>

<div className="note">Примечание. Вы можете использовать другие имена <span className="spanTag">slug</span>, например: <span className="spanTag">[...param]</span></div>

Соответствующие параметры будут отправлены <span className="spanTag">slug</span> на страницу как параметр запроса (в примере), и это всегда будет массив, поэтому путь <span className="spanTag">/post/a</span> будет иметь следующий <span className="spanTag">query</span> объект:
<Highlight language="json">
    {`{ "slug": ["a"] }`}
</Highlight>

И в случае <span className="spanTag">/post/a/b</span>, и любого другого совпадающего пути к массиву будут добавлены новые параметры, например:
<Highlight language="json">
    {`{ "slug": ["a", "b"] }`}
</Highlight>

<h3>Необязательно поймать все маршруты</h3>

Поймать все маршруты можно сделать необязательными, включив параметр в двойные скобки (<span className="spanTag">[[...slug]]</span>).
<p>
Например, <span className="spanTag">pages/post/[[...slug]].js</span> будет соответствовать <span className="spanTag">/post</span>, <span className="spanTag">/post/a</span>, <span className="spanTag">/post/a/b</span> и так далее.
</p>

Основное различие между маршрутами <span className="spanTag">catch all</span> и <span className="spanTag">optional catch all</span> заключается в том, что с <span className="spanTag">optional</span> маршрут без параметра также сопоставляется (<span className="spanTag">/post</span> в примере выше).

<p>Эти <span className="spanTag">query</span> объекты являются следующими:</p>


<Highlight language="json">
    {`{ } // GET '/post' (empty object)
{ "slug": ["a"] } // 'GET /post/a' (single-element array)
{ "slug": ["a", "b"] } // 'GET /post/a/' (multi-element array)`}
</Highlight>

Хорошим примером необязательного перехвата всех маршрутов являются документы Next.js, единственная страница с именем <span className="spanTag">pages/docs/[[... slug]].js</span> заботится обо всех документах, которые вы просматриваете в данный момент.

<h2>Предостережения</h2>

Предопределенные маршруты имеют приоритет над динамическими маршрутами, а динамические маршруты имеют приоритет над всеми маршрутами. Взгляните на следующие примеры:
<p className='list'> - <span className="spanTag">pages/post/create.js</span> - Будет соответствовать <span className="spanTag">/post/create</span></p>
<p className='list'> - <span className="spanTag">pages/post/[pid].js</span> - Будет соответствовать <span className="spanTag">/post/1</span>, <span className="spanTag">/post/abc</span> и т.д. Но не <span className="spanTag">/post/create</span></p>
<p className='list'> - <span className="spanTag">pages/post/[...slug].js</span> - Будет соответствовать <span className="spanTag">/post/1/2</span>, <span className="spanTag">/post/a/b/c</span> и т.д. Но не <span className="spanTag">/post/create</span>, <span className="spanTag">/post/abc</span></p>

<p>
- Страницы, статически оптимизированные с помощью автоматической статической оптимизации, будут гидратированы без указания параметров маршрута, то есть <span className="spanTag">query</span> будут пустым объектом.
</p>


 - При маршрутизации к динамическому маршруту с использованием <span className="spanTag">Link</span> или router вам нужно будет указать в <span className="spanTag">href</span> качестве динамического маршрута, например, <span className="spanTag">/post/[pid]</span> и as в качестве декоратора для URL-адреса, например <span className="spanTag">/post/abc</span>.
<p>
После гидратации Next.js запустит обновление вашего приложения, чтобы предоставить параметры маршрута в <span className="spanTag">query</span> объекте.
</p>
            </div>
        </Docs>
    )
}
