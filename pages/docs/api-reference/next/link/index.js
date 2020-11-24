import Docs from '../../../../../components/Docs/Docs'
import Highlight from 'react-highlight.js'


export default () => {
    return(
        <Docs>
            <div className="container">
<h1>next/link</h1>
<div className="note">Прежде чем двигаться дальше, мы рекомендуем вам сначала прочитать "Введение в маршрутизацию".</div>


Переходы между маршрутами на стороне клиента можно включить с помощью <span className="spanTag">Link</span> компонента, экспортируемого с помощью <span className="spanTag">next/link</span>.

<p>В качестве примера рассмотрим <span className="spanTag">pages</span> каталог со следующими файлами:</p>
<p className="list"><strong>pages/index.js</strong></p>
<p className="list"><strong>pages/about.js</strong></p>
<p className="list"><strong>pages/blog/[slug].js</strong></p>

У нас может быть ссылка на каждую из этих страниц следующим образом:

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

<span className="spanTag">Link</span> принимает следующие реквизиты:

<p className="list"> - <strong>href</strong> - Путь или URL-адрес для перехода. Это единственная необходимая опора</p>
<p className="list"> - <strong>as</strong> - Необязательный декоратор для пути, который будет отображаться в адресной строке браузера. До Next.js 9.5.3 это использовалось для динамических маршрутов, посмотрите наши предыдущие документы, чтобы увидеть, как это работало.</p>
<p className="list"> - <strong>passHref</strong> - Заставляет Link передать href собственность своему потомку. По умолчанию false</p>
<p className="list"> - <strong>prefetch</strong> - Предварительная загрузка страницы в фоновом режиме. По умолчанию true. Все, {`<Link />`} что находится в области просмотра (изначально или через прокрутку), будет предварительно загружено. Страницы, использующие статическую генерацию, будут предварительно загружать JSON файлы с данными для более быстрого перехода между страницами.</p>
<p className="list"> - <strong>replace</strong> - Заменить текущее history состояние вместо добавления нового URL в стек. По умолчанию false</p>
<p className="list"> - <strong>scroll</strong> - Прокрутите страницу до верха после навигации. По умолчанию true</p>
<p className="list"> - <strong>shallow</strong> - Обновить путь к текущей странице без повторного запуска getStaticProps, getServerSideProps или getInitialProps. По умолчанию false</p>

<h2>Если на маршруте есть динамические участки</h2>

Нет ничего особенного при связывании с динамическим маршрутом, включая перехват всех маршрутов, начиная с Next.js 9.5.3 (для более старых версий см. Наши предыдущие документы ). Однако может стать довольно распространенным и удобным использование интерполяции или объекта URL для создания ссылки.
<p>Например, динамический маршрут <span className="spanTag">pages/blog/[slug].js</span> будет соответствовать следующей ссылке:</p>


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

<h2>Если дочерний элемент - это пользовательский компонент, который обертывает {`<a>`}тег</h2>

Если дочерний <span className="spanTag">Link</span> элемент является настраиваемым компонентом, который является оболочкой для {`<a>`} тега, вы должны добавить его <span className="spanTag">passHref</span> в Link. Это необходимо, если вы используете такие библиотеки, как styled-components. Без этого у {`<a>`} тега не будет <span className="spanTag">href</span> атрибута, что может повредить SEO вашего сайта.

<Highlight language="javascript">
{`import Link from 'next/link'
import styled from 'styled-components'

// This creates a custom component that wraps an <a> tag
const RedLink = styled.a'
  color: red;
'

function NavLink({ href, name }) {
  // Must add passHref to Link
  return (
    <Link href={href} passHref>
      <RedLink>{name}</RedLink>
    </Link>
  )
}

export default NavLink`}
</Highlight>

<div className="note">Примечание: Если вы используете JSX функцию ( @jsx jsx), вы должны использовать <span className="spanTag">passHref</span> даже если вы используете {`<a>`} тег непосредственно.</div>

<h2>Если дочерний элемент является функциональным компонентом</h2>

Если дочерний <span className="spanTag">Link</span> элемент является функциональным компонентом, помимо использования <span className="spanTag">passHref</span>, вы должны заключить компонент в React.forwardRef:

<Highlight language="javascript">
{`import Link from 'next/link'

// 'onClick', 'href', and 'ref' need to be passed to the DOM element
// for proper handling
const MyButton = React.forwardRef(({ onClick, href }, ref) => {
  return (
    <a href={href} onClick={onClick} ref={ref}>
      Click Me
    </a>
  )
})

function Home() {
  return (
    <Link href="/about" passHref>
      <MyButton />
    </Link>
  )
}

export default Home`}
</Highlight>

<h2>С помощью объекта URL</h2>

<span className="spanTag">Link</span> может также получить объект URL и автоматически отформатировать его для создания строки URL. Вот как это сделать:

<Highlight language="javascript">
{`import Link from 'next/link'

function Home() {
  return (
    <ul>
      <li>
        <Link
          href={{
            pathname: '/about',
            query: { name: 'test' },
          }}
        >
          <a>About us</a>
        </Link>
      </li>
      <li>
        <Link
          href={{
            pathname: '/blog/[slug]',
            query: { slug: 'my-post' },
          }}
        >
          <a>Blog Post</a>
        </Link>
      </li>
    </ul>
  )
}

export default Home`}
</Highlight>

В приведенном выше примере есть ссылка на:
<p className="list"> - Предопределенный маршрут: /about?name=test</p>
<p className="list"> - Динамический маршрут: /blog/my-post</p>
Вы можете использовать каждое свойство, как определено в документации модуля Node.js URL .

<h2>Заменить URL вместо push</h2>

По умолчанию компонент <span className="spanTag">Link</span>  использует <span className="spanTag">push</span> новый URL-адрес в history стеке. Вы можете использовать <span className="spanTag">replace</span> опору, чтобы предотвратить добавление новой записи, как в следующем примере:

<Highlight language="javascript">
{`<Link href="/about" replace>
  <a>About us</a>
</Link>`}
</Highlight>

<h2>Использование компонента, поддерживающего onClick</h2>

<span className="spanTag">Link</span> поддерживает любой компонент, поддерживающий onClick событие, если вы не предоставляете {`<a>`} тег, рассмотрим следующий пример:

<Highlight language="javascript">
{`<Link href="/about">
  <img src="/static/image.png" alt="image" />
</Link>`}
</Highlight>

Дочерний элемент Linkis {`<img>`} вместо {`<a>`}. Link отправит onClick собственность {`<img>`}, но не передаст <span className="spanTag">href</span> собственность.

<h2>Отключить прокрутку вверх страницы</h2>

По умолчанию в <span className="spanTag">Link</span> используется прокрутка к началу страницы. Когда есть определенный хэш, он будет прокручиваться до определенного идентификатора, как обычный {`<a>`} тег. Для предотвращения прокрутки вверх / хеш scroll={`{false}`} можно добавить в Link:

<Highlight language="javascript">
{`<Link href="/?counter=10" scroll={false}>
  <a>Disables scrolling to the top</a>
</Link>`}
</Highlight>

            </div>
        </Docs>
    )
}