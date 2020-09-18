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
Когда файл добавляется в pages каталог, он автоматически становится доступным в качестве маршрута.
</p>
<p>
Файлы внутри pages каталога можно использовать для определения наиболее распространенных шаблонов.
</p>

<h4>Указать маршруты</h4>

Маршрутизатор автоматически направит файлы с указанными именами indexв корень каталога.

<p className='list'>
 - pages/index.js → /
</p>
<p className='list'>
 - pages/blog/index.js → /blog
</p>

<h4>Вложенные маршруты</h4>

Маршрутизатор поддерживает вложенные файлы. Если вы создадите вложенную структуру папок, файлы будут автоматически маршрутизироваться таким же образом.

<p className='list'>
 - pages/blog/first-post.js → /blog/first-post
</p>
<p className='list'>
 - pages/dashboard/settings/username.js → /dashboard/settings/username
</p>



<h4>Сегменты динамического маршрута</h4>

Чтобы сопоставить динамический сегмент, вы можете использовать синтаксис скобок. Это позволяет вам сопоставлять именованные параметры.

<p className='list'>
 - pages/blog/[slug].js→ /blog/:slug( /blog/hello-world)
</p>
<p className='list'>
 - pages/[username]/settings.js→ /:username/settings( /foo/settings)
</p>
<p className='list'>
 - pages/post/[...all].js→ /post/*( /post/2020/id/title)
</p>




<h2>Ссылки между страницами</h2>
<p>
Маршрутизатор Next.js позволяет выполнять переходы маршрутов между страницами на стороне клиента, как в одностраничном приложении.
</p>

Для Link выполнения этого перехода маршрута на стороне клиента предоставляется вызываемый компонент React .

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
При связывании с маршрутом с сегментами динамического пути вы должны предоставить href и as убедиться, что маршрутизатор знает, какой файл JavaScript загружать.
</p>
<p className='list'>
 - href - Название страницы в pagesкаталоге. Например /blog/[slug].
</p>
<p className='list'>
 - as - URL-адрес, который будет отображаться в браузере. Например /blog/hello-world.
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

as Опора может также быть сгенерированы динамически. Например, чтобы показать список сообщений, которые были переданы на страницу в качестве опоры:

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

Для доступа к router объекту в компоненте React вы можете использовать useRouter или withRouter.
<p>В общем, мы рекомендуем использовать useRouter.</p>

            </div>
        </Docs>
    )
}