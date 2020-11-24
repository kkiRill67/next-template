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
    </ul>
  )
}

export default Home`}
</Highlight>

<p>
При связывании с маршрутом с сегментами динамического пути вы должны предоставить <span className="spanTag">href</span> и <span className="spanTag">as</span>, убедиться что маршрутизатор знает, какой файл JavaScript загружать.
</p>
<p className='list'>
 - <span className="spanTag">href</span> - Название страницы в pages каталоге. Например <span className="spanTag">/blog/[slug]</span>.
</p>
<p className='list'>
 - <span className="spanTag">as</span> - URL-адрес, который будет отображаться в браузере. Например <span className="spanTag">/blog/hello-world</span>.
</p>



<Highlight language="javascript">
    {`import Link from 'next/link'

function Home() {
  return (
    <ul>
      <li>
        <Link href="/blog/[slug]" as="/blog/hello-world">
          <a>To Hello World Blog post</a>
        </Link>
      </li>
    </ul>
  )
}

export default Home`}
</Highlight>

<span className="spanTag">as</span> может также быть сгенерирован динамически. Например, чтобы показать список сообщений, которые были переданы на страницу:

<Highlight language="javascript">
    {`function Home({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <Link href="/blog/[slug]" as={'/blog/\${post.slug}'9}>
            <a>{post.title}</a>
          </Link>
        </li>
      ))}
    </ul>
  )
}`}
</Highlight>

<h2>Внедрение роутера</h2>

Для доступа к объекту <span className="spanTag">router</span> в компоненте React вы можете использовать <span className="spanTag">useRouter</span> или <span className="spanTag">withRouter</span>.
<p>В общем, мы рекомендуем использовать <span className="spanTag">useRouter</span>.</p>

            </div>
        </Docs>
    )
}