import Docs from '../../../../components/Docs/Docs'
import Highlight from 'react-highlight.js'

export default function Index(props) {

    return(
        <Docs>
            <div className="container">
                <h1>На заказ App</h1>
            
Next.js использует Appкомпонент для инициализации страниц. Вы можете переопределить его и контролировать инициализацию страницы. Что позволяет делать такие удивительные вещи, как:
<p className="list"> - Сохранение макета между изменениями страницы</p>
<p className="list"> - Сохранение состояния при навигации по страницам</p>
<p className="list"> - Пользовательская обработка ошибок с использованием componentDidCatch</p>
<p className="list"> - Вставить дополнительные данные на страницы</p>
<p className="list"> - Добавить глобальный CSS</p>

Чтобы изменить значение по умолчанию App, создайте файл, ./pages/_app.jsкак показано ниже:

<Highlight language="node">
{`// import App from 'next/app'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's 'getInitialProps' and fills 'appProps.pageProps'
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp`}
</Highlight>

Component Опора является активным page, поэтому, когда вы перемещаться между маршрутами, Component изменится на новый page. Следовательно, любой реквизит, который вы отправляете, Component будет получен page.
<p>
pageProps - это объект с исходными реквизитами, которые были предварительно загружены для вашей страницы одним из наших методов выборки данных, в противном случае это пустой объект.
</p>

<h2>Предостережения</h2>

<p>
 - Если ваше приложение работает и вы только что добавили пользовательский App, вам необходимо перезапустить сервер разработки. Требуется, только если pages/_app.js раньше не существовало.
</p>
<p>
 - Добавление настройки getInitialProps в ваш App отключит автоматическую статическую оптимизацию на страницах без статической генерации.
</p>

<h2>Typescript</h2>
Если вы используете TypeScript, ознакомьтесь с нашей документацией по TypeScript
            </div>
        </Docs>
    )
}