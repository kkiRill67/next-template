import Docs from '../../../../components/Docs/Docs'
import Highlight from 'react-highlight.js'

export default () => {
    return(
        <Docs>
            <div className="container">
                <h1>Маршрутизация</h1>
            <p>
Next.js имеет маршрутизатор на основе файловой системы, построенный на концепции страниц.
            </p>
<p>
Когда файл добавляется в <span className="spanTag">pages</span> каталог, он автоматически становится доступным в качестве маршрута.
</p>
<p>
Файлы внутри <span className="spanTag">pages</span> каталога можно использовать для определения наиболее распространенных шаблонов.
</p>

<h4>Указать маршруты</h4>

Маршрутизатор автоматически направит файлы с указанными именами <span className="spanTag">index</span> в корень каталога.

<p className='list'>
 - <span className="spanTag">pages/index.js</span> → <span className="spanTag">/</span>
</p>
<p className='list'>
 - <span className="spanTag">pages/blog/index.js</span> → <span className="spanTag">/blog</span>
</p>

<h4>Вложенные маршруты</h4>

Маршрутизатор поддерживает вложенные файлы. Если вы создадите вложенную структуру папок, файлы будут автоматически маршрутизироваться таким же образом.

<p className='list'>
 - <span className="spanTag">pages/blog/first-post.js</span> → <span className="spanTag">/blog/first-post</span>
</p>
<p className='list'>
 - <span className="spanTag">pages/dashboard/settings/username.js</span> → <span className="spanTag">/dashboard/settings/username</span>
</p>



<h4>Сегменты динамического маршрута</h4>

Чтобы сопоставить динамический сегмент, вы можете использовать синтаксис скобок. Это позволяет вам сопоставлять именованные параметры.

<p className='list'>
 - <span className="spanTag">pages/blog/[slug].js</span> → <span className="spanTag">/blog/:slug</span> (/blog/hello-world)
</p>
<p className='list'>
 - <span className="spanTag">pages/[username]/settings.js</span> → <span className="spanTag">/:username/settings</span> (/foo/settings)
</p>
<p className='list'>
 - <span className="spanTag">pages/post/[...all].js</span> → <span className="spanTag">/post/*</span> (/post/2020/id/title)
</p>




<h2>Ссылки между страницами</h2>
<p>
Маршрутизатор Next.js позволяет выполнять переходы маршрутов между страницами на стороне клиента, как в одностраничном приложении.
</p>

Для <span className="spanTag">Link</span> выполнения этого перехода маршрута на стороне клиента предоставляется вызываемый компонент React.

<Highlight language="javascript">
    {`import Link from 'next/link'

function Home() {
  return (
    <ul>
      <li>
        <Link href="/">
          <a>Home</a>
        </Link>
      </li>
      <li>
        <Link href="/about">
          <a>About Us</a>
        </Link>
      </li>
      <li>
        <Link href="/blog/hello-world">
          <a>Blog Post</a>
        </Link>
      </li>
    </ul>
  )
}

export default Home`}
</Highlight>

В приведенном выше примере у нас есть несколько ссылок, каждая из которых отображает путь <span className="spanTag">(href)</span> на известную страницу:
<p className='list'>
  <p> - <span className="spanTag">/</span> → <span className="spanTag">pages/index.js</span></p>
  <p> - <span className="spanTag">/about</span> → <span className="spanTag">pages/about.js</span></p>
  <p> - <span className="spanTag">/blog/hello-world</span> → <span className="spanTag">pages/blog/[slug].js</span></p>
</p>

<h2>Связывание с динамическими путями</h2>

Вы также можете использовать интерполяцию для создания пути, что удобно для динамических сегментов маршрута. Например, чтобы показать список сообщений, которые были переданы компоненту как prop:

<Highlight language="javascript">
    {`import Link from 'next/link'

function Posts({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <Link href={'/blog/\${encodeURIComponent(post.slug)}'}>
            <a>{post.title}</a>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default Posts`}
</Highlight>

<p className="note"><span className="spanTag">encodeURIComponent</span> используется в примере для обеспечения совместимости пути с utf-8.</p>
В качестве альтернативы, используя объект URL:

<Highlight language="javascript">
    {`import Link from 'next/link'

function Posts({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <Link
            href={{
              pathname: '/blog/[slug]',
              query: { slug: post.slug },
            }}
          >
            <a>{post.title}</a>
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default Posts`}
</Highlight>

Теперь вместо использования интерполяции для создания пути мы используем объект URL, <span className="spanTag">href</span> где:
<p className='list'>
- <span className="spanTag">pathname</span> - это имя страницы в каталоге <span className="spanTag">pages</span>. В этом случае <span className="spanTag">/blog/[slug]</span>.
- <span className="spanTag">query</span> - это объект с динамическим сегментом. В этом случае<span className="spanTag">slug</span>.
</p>


<h2>Внедрение роутера</h2>

Для доступа к объекту <span className="spanTag">router</span> в компоненте React вы можете использовать <span className="spanTag">useRouter</span> или <span className="spanTag">withRouter</span>.
<p>В общем, мы рекомендуем использовать <span className="spanTag">useRouter</span>.</p>

            </div>
        </Docs>
    )
}