import Docs from '../../../../components/Docs/Docs'
import Highlight from 'react-highlight.js'


export default () => {
    return(
        <Docs>
            <div className="container">
<h1>getInitialProps</h1>

<div className="note">
    <strong>Рекомендуется:</strong> getStaticProps или getServerSideProps.
    <p>
        Если вы используете Next.js 9.3 или новее, мы рекомендуем использовать getStaticProps или getServerSideProps вместо getInitialProps.
    </p>
    <p>Эти новые методы выборки данных позволяют выбирать между статической генерацией и рендерингом на стороне сервера. Узнайте больше о документации по страницам и извлечению данных.</p>
</div>   

getInitialProps включает рендеринг на стороне сервера и позволяет выполнять начальное заполнение данных , что означает отправку страницы с данными, уже заполненными с сервера. Это особенно полезно для SEO .
<p></p>
<div className="note">getInitialProps отключит автоматическую статическую оптимизацию.</div>


getInitialProps - это async функция, которую можно добавить на любую страницу в виде файла static method. Взгляните на следующий пример:

<Highlight language="javascript">
{`function Page({ stars }) {
  return <div>Next stars: {stars}</div>
}

Page.getInitialProps = async (ctx) => {
  const res = await fetch('https://api.github.com/repos/vercel/next.js')
  const json = await res.json()
  return { stars: json.stargazers_count }
}

export default Page`}
</Highlight>

Или используя компонент класса:

<Highlight language="javascript">
{`import React from 'react'

class Page extends React.Component {
  static async getInitialProps(ctx) {
    const res = await fetch('https://api.github.com/repos/vercel/next.js')
    const json = await res.json()
    return { stars: json.stargazers_count }
  }

  render() {
    return <div>Next stars: {this.props.stars}</div>
  }
}

export default Page`}
</Highlight>

getInitialProps используется для асинхронной выборки некоторых данных, которые затем заполняются props.
<p>Данные, возвращаемые из getInitialProps, сериализуются при рендеринге сервера, аналогично тому, как это JSON.stringify происходит. Убедитесь, что возвращенный объект getInitialProps является простым Object и не использует Date, Map или Set.</p>
При начальной загрузке страницы getInitialProps будет выполняться только на сервере. getInitialProps затем будет запускаться на клиенте при переходе к другому маршруту через next/link компонент или с помощью next/router.

<h2>Объект контекста</h2>

getInitialProps получает единственный вызываемый аргумент context, это объект со следующими свойствами:
<p className="list"> - pathname - Текущий маршрут. Это путь к странице /pages</p>
<p className="list"> - query - Раздел строки запроса URL-адреса, анализируемого как объект</p>
<p className="list"> - asPath - String фактического пути (включая запрос), отображаемого в браузере</p>
<p className="list"> - req - объект HTTP-запроса (только сервер)</p>
<p className="list"> - res - объект HTTP-ответа (только сервер)</p>
<p className="list"> - err - Объект ошибки, если во время рендеринга обнаружена какая-либо ошибка</p>

<h2>Предостережения</h2>

<p className="list"> - getInitialProps может не использоваться в детских компонентов, только в экспорте по умолчанию каждой страницы</p>
<p className="list"> - Если вы используете внутри только серверные модули getInitialProps, убедитесь, что импортировали их правильно , иначе это замедлит работу вашего приложения.</p>

<h2>TypeScript</h2>
Если вы используете TypeScript, вы можете использовать этот NextPage тип для функциональных компонентов:

<Highlight language="javascript">
{`import { NextPage } from 'next'

interface Props {
  userAgent?: string;
}

const Page: NextPage<Props> = ({ userAgent }) => (
  <main>Your user agent: {userAgent}</main>
)

Page.getInitialProps = async ({ req }) => {
  const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
  return { userAgent }
}

export default Page`}
</Highlight>

И для React.Component, вы можете использовать NextPageContext:

<Highlight language="javascript">
{`import React from 'react'
import { NextPageContext } from 'next'

interface Props {
  userAgent?: string;
}

export default class Page extends React.Component<Props> {
  static async getInitialProps({ req }: NextPageContext) {
    const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
    return { userAgent }
  }

  render() {
    const { userAgent } = this.props
    return <main>Your user agent: {userAgent}</main>
  }
}`}
</Highlight>


            </div>
        </Docs>
    )
}