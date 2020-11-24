import Docs from '../../../../../components/Docs/Docs'
import Highlight from 'react-highlight.js'


export default () => {
    return(
        <Docs>
            <div className="container">
                <h1>next/router</h1>
<div className="note">Прежде чем двигаться дальше, мы рекомендуем вам сначала прочитать "Введение в маршрутизацию".</div>
                
<h2>useRouter</h2>

Если вы хотите получить доступ к <span className="spanTag">router</span> объекту внутри любого функционального компонента в своем приложении, вы можете использовать <span className="spanTag">useRouter</span> ловушку, взгляните на следующий пример:

<Highlight language="javascript">
{`import { useRouter } from 'next/router'

function ActiveLink({ children, href }) {
  const router = useRouter()
  const style = {
    marginRight: 10,
    color: router.pathname === href ? 'red' : 'black',
  }

  const handleClick = (e) => {
    e.preventDefault()
    router.push(href)
  }

  return (
    <a href={href} onClick={handleClick} style={style}>
      {children}
    </a>
  )
}

export default ActiveLink`}
</Highlight>

<div className="note"><span className="spanTag">useRouter</span> это React Hook, то есть его нельзя использовать с классами. Вы можете использовать <span className="spanTag">withRouter</span> или обернуть свой класс функциональным компонентом.</div>

<h2>router объект</h2>

Ниже приводится определение <span className="spanTag">router</span> объекта, возвращаемого обоими <span className="spanTag">useRouter</span> и <span className="spanTag">withRouter</span>:
<p className="list"> - <span className="spanTag">pathname: String</span> - Текущий маршрут. Это путь к странице в <span className="spanTag">/pages</span></p>
<p className="list"> - <span className="spanTag">query: Object</span> - Строка запроса, анализируемая до объекта. Во время предварительной отрисовки это будет пустой объект, если на странице нет требований к выборке данных. По умолчанию {`{}`}</p>
<p className="list"> - <span className="spanTag">asPath: String</span> - Фактический путь (включая запрос), отображаемый в браузере</p>

Дополнительно внутрь также включены следующие методы <span className="spanTag">router</span>:

<h3><span className="spanTag">router.push</span></h3>

Обрабатывает переходы на стороне клиента, этот метод полезен в случаях, когда их <span className="spanTag">next/link</span> недостаточно.

<Highlight language="javascript">
{`router.push(url, as, options)`}
</Highlight>

<p className="list"> - <span className="spanTag">url</span> - URL-адрес для перехода</p>
<p className="list"> - <span className="spanTag">as</span> - Дополнительный декоратор для URL-адреса, который будет отображаться в браузере. До Next.js 9.5.3 это использовалось для динамических маршрутов, посмотрите наши предыдущие документы, чтобы увидеть, как это работало.</p>
<p className="list"> - <span className="spanTag">options</span> - Необязательный объект со следующими параметрами конфигурации:
<p className="list"> - <span className="spanTag">shallow</span>: Обновить путь к текущей странице без повторного запуска <span className="spanTag">getStaticProps</span>, <span className="spanTag">getServerSideProps</span> или <span className="spanTag">getInitialProps</span>. По умолчанию false</p>
</p>
<div className="note">Вам не нужно использовать <span className="spanTag">router.push</span> для внешних URL-адресов. <span className="spanTag">window.location</span> лучше подходит для таких случаев.</div>

<h4>Использование</h4>

Навигация <span className="spanTag">pages/about.js</span> по заранее определенному маршруту:

<Highlight language="javascript">
{`import { useRouter } from 'next/router'

export default function Page() {
  const router = useRouter()

  return <span onClick={() => router.push('/about')}>Click me</span>
}`}
</Highlight>

Навигация <span className="spanTag">pages/post/[pid].js</span>, которая представляет собой динамический маршрут:

<Highlight language="javascript">
{`import { useRouter } from 'next/router'

export default function Page() {
  const router = useRouter()

  return <span onClick={() => router.push('/post/abc')}>Click me</span>
}`}
</Highlight>

Перенаправление пользователя <span className="spanTag">pages/login.js</span>, полезно для страниц за аутентификацией:

<Highlight language="javascript">
{`import { useEffect } from 'react'
import { useRouter } from 'next/router'

// Here you would fetch and return the user
const useUser = () => ({ user: null, loading: false })

export default function Page() {
  const { user, loading } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!(user || loading)) {
      router.push('/login')
    }
  }, [user, loading])

  return <p>Redirecting...</p>
}`}
</Highlight>

<h4>С объектом URL</h4>
Вы можете использовать объект URL точно так же, как и для него <span className="spanTag">next/link</span>. Работы для обоих <span className="spanTag">url</span> и <span className="spanTag">as</span> параметров:

<Highlight language="javascript">
{`import { useRouter } from 'next/router'

export default function ReadMore({ post }) {
  const router = useRouter()

  return (
    <span
      onClick={() => {
        router.push({
          pathname: '/post/[pid]',
          query: { pid: post.id },
        })
      }}
    >
      Click here to read more
    </span>
  )
}`}
</Highlight>
<h3>router.replace</h3>

Подобно <span className="spanTag">replace</span> опоре в <span className="spanTag">next/link</span>, <span className="spanTag">router.replace</span> предотвращает добавление новой записи URL-адреса в <span className="spanTag">history</span> стек.

<Highlight language="javascript">
{`router.replace(url, as, options)`}
</Highlight>

 - API для <span className="spanTag">router.replace</span> точно такой же, как API для <span className="spanTag">router.push</span>.

<h4>Использование</h4>

Взгляните на следующий пример:

<Highlight language="javascript">
{`import { useRouter } from 'next/router'

export default function Page() {
  const router = useRouter()

  return <span onClick={() => router.replace('/home')}>Click me</span>
}`}
</Highlight>

<h3>router.prefetch</h3>
<p>
Предварительная загрузка страниц для более быстрого перехода на стороне клиента. Этот метод полезен только для навигации без него <span className="spanTag">next/link</span>, так как <span className="spanTag">next/link</span> автоматически выполняет предварительную выборку страниц.
</p>
<div className="note">Эта функция предназначена только для производства. Next.js не выполняет предварительную загрузку страниц при разработке.</div>


<Highlight language="javascript">
{`router.prefetch(url, as)`}
</Highlight>

<p className="list"><span className="spanTag">url</span> - URL-адрес для предварительной выборки, то есть путь к соответствующей странице</p>
<p className="list"><span className="spanTag">as</span> - Необязательный декоратор для <span className="spanTag">url</span>. До Next.js 9.5.3 он использовался для предварительной выборки динамических маршрутов, посмотрите наши предыдущие документы, чтобы увидеть, как это работало.</p>

<h4>Bспользование</h4>

Допустим, у вас есть страница входа в систему, и после входа вы перенаправляете пользователя на панель управления. В этом случае мы можем выполнить предварительную выборку панели мониторинга, чтобы сделать переход быстрее, как в следующем примере:

<Highlight language="javascript">
{`import { useCallback, useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Login() {
  const router = useRouter()
  const handleSubmit = useCallback((e) => {
    e.preventDefault()

    fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        /* Form data */
      }),
    }).then((res) => {
      // Do a fast client-side transition to the already prefetched dashboard page
      if (res.ok) router.push('/dashboard')
    })
  }, [])

  useEffect(() => {
    // Prefetch the dashboard page
    router.prefetch('/dashboard')
  }, [])

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button type="submit">Login</button>
    </form>
  )
}`}
</Highlight>

<h3>router.beforePopState</h3>

В некоторых случаях (например, при использовании настраиваемого сервера) вы можете захотеть прослушать <span className="spanTag">popstate</span> и сделать что-нибудь до того, как маршрутизатор обработает его.

<Highlight language="javascript">
{`router.beforePopState(cb)`}
</Highlight>

<p className="list">
     - <span className="spanTag">cb</span> - Функция запуска при входящих popstate событиях. Функция получает состояние события как объект со следующими реквизитами:
    <p className="list"> - <span className="spanTag">url: String</span> - маршрут для нового состояния. Обычно это имя page</p>
    <p className="list"> - <span className="spanTag">as: String</span> - URL - адрес, который будет отображаться в браузере</p>
    <p className="list"> - <span className="spanTag">options: Object</span> - Дополнительные параметры, отправленные <span className="spanTag">router.push</span></p>
</p>

В случае <span className="spanTag">cb</span> возврата false маршрутизатор Next.js не будет обрабатывать его <span className="spanTag">popstate</span>, и в этом случае вы будете нести ответственность за его обработку. См. Отключение маршрутизации файловой системы.

<h4>Использование</h4>

Вы можете использовать <span className="spanTag">beforePopState</span> для управления запросом или принудительного обновления SSR, как в следующем примере:

<Highlight language="javascript">
{`import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Page() {
  const router = useRouter()

  useEffect(() => {
    router.beforePopState(({ url, as, options }) => {
      // I only want to allow these two routes!
      if (as !== '/' && as !== '/other') {
        // Have SSR render bad routes as a 404.
        window.location.href = as
        return false
      }

      return true
    })
  }, [])

  return <p>Welcome to the page</p>
}`}
</Highlight>

<h3>router.back</h3>

Вернитесь в историю. Эквивалентно нажатию кнопки возврата в браузере. Он исполняется <span className="spanTag">window.history.back()</span>.

<h4>Использование</h4>

<Highlight language="javascript">
{`import { useRouter } from 'next/router'

export default function Page() {
  const router = useRouter()

  return <span onClick={() => router.back()}>Click here to go back</span>
}`}
</Highlight>

<h3>router.reload</h3>

Обновите текущий URL. Эквивалентно нажатию кнопки обновления в браузере. Он исполняется <span className="spanTag">window.location.reload()</span>.

<h4>Использование</h4>

<Highlight language="javascript">
{`import { useRouter } from 'next/router'

export default function Page() {
  const router = useRouter()

  return <span onClick={() => router.reload()}>Click here to reload</span>
}`}
</Highlight>

<h3>router.events</h3>

Вы можете прослушивать различные события, происходящие внутри маршрутизатора Next.js. Вот список поддерживаемых событий:
<p className="list"> - routeChangeStart(url) - Срабатывает, когда маршрут начинает меняться</p>
<p className="list"> - routeChangeComplete(url) - Срабатывает при полном изменении маршрута</p>
<p className="list">
 - routeChangeError(err, url) - Срабатывает, когда возникает ошибка при изменении маршрута или загрузка маршрута отменяется
    <p className="list"> - err.cancelled - Указывает, была ли отменена навигация</p>
</p>
<p className="list"> - beforeHistoryChange(url) - Срабатывает непосредственно перед изменением истории браузера</p>
<p className="list"> - hashChangeStart(url) - Срабатывает, когда хеш изменится, но не страница</p>
<p className="list"> - hashChangeComplete(url) - Срабатывает, когда хеш изменился, но не страница</p>

<div className="note">Примечание. Вот url URL-адрес, отображаемый в браузере, включая расширение basePath.</div>

<h4>Использование</h4>
Например, чтобы прослушать событие маршрутизатора <span className="spanTag">routeChangeStart</span>, откройте или создайте <span className="spanTag">pages/_app.js</span> событие и подпишитесь на него, например:

<Highlight language="javascript">
{`import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function MyApp({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url) => {
      console.log('App is changing to: ', url)
    }

    router.events.on('routeChangeStart', handleRouteChange)

    // If the component is unmounted, unsubscribe
    // from the event with the 'off' method:
    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [])

  return <Component {...pageProps} />
}`}
</Highlight>

<div className="note">В этом примере мы используем Custom App (pages/_app.js), чтобы подписаться на событие, потому что оно не отключается при навигации по страницам, но вы можете подписаться на события маршрутизатора в любом компоненте вашего приложения.</div>

<p>События маршрутизатора должны регистрироваться при монтировании компонента (useEffect или componentDidMount/componentWillUnmount) или императивно, когда происходит событие.</p>

<p>Если загрузка маршрута отменена (например, при быстром нажатии двух ссылок подряд), <span className="spanTag">routeChangeError</span> сработает. И переданный <span className="spanTag">err</span> будет содержать <span className="spanTag">cancelled</span> свойство, установленное на true, как в следующем примере:</p>


<Highlight language="javascript">
{`import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function MyApp({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChangeError = (err, url) => {
      if (err.cancelled) {
        console.log('Route to \${url} was cancelled!')
      }
    }

    router.events.on('routeChangeError', handleRouteChangeError)

    // If the component is unmounted, unsubscribe
    // from the event with the 'off' method:
    return () => {
      router.events.off('routeChangeError', handleRouteChangeError)
    }
  }, [])

  return <Component {...pageProps} />
}`}
</Highlight>

<h2><span className="spanTag">withRouter</span></h2>

Если вам <span className="spanTag">useRouter</span> не подходит, в <span className="spanTag">withRouter</span> можно добавить тот же <span className="spanTag">router</span> объект к любому компоненту.

<h4>Использование</h4>
<Highlight language="javascript">
{`import { withRouter } from 'next/router'

function Page({ router }) {
  return <p>{router.pathname}</p>
}

export default withRouter(Page)`}
</Highlight>

            </div>
        </Docs>
    )
}