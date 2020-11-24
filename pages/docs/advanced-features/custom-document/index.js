import Docs from '../../../../components/Docs/Docs'
import Highlight from 'react-highlight.js'

export default function Index(props) {

    return(
        <Docs>
            <div className="container">
                <h1>Пользовательский Document</h1>
            
Пользовательские <span className="spanTag">Document</span> настройки обычно используются для расширения тегов {`<html>`}и {`<body>`} тегов вашего приложения. Это необходимо, потому что страницы Next.js пропускают определение разметки окружающего документа.
<p>
Чтобы переопределить значение по умолчанию <span className="spanTag">Document</span>, создайте файл <span className="spanTag">./pages/_document.js</span> и расширьте класс <span className="spanTag">Document</span>, как показано ниже:
</p>

<Highlight language="javascript">
{`import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument`}
</Highlight>

<div className="note">
Приведенный выше код по умолчанию <span className="spanTag">Document</span> добавлен Next.js. Не стесняйтесь удалять функцию <span className="spanTag">getInitialProps</span> или, если вам не нужно их менять <span className="spanTag">.renderMyDocument</span>
</div>

{`<Html>`}, {`<Head />`}, {`<Main />`} и {`<NextScript />`} необходимы для страницы, чтобы надлежащим образом оказана.

<p>Пользовательские атрибуты разрешены как реквизиты, например lang:</p>


<Highlight language="html">
{`<Html lang="en">`}
</Highlight>

{`<Head />`} Компонент, используемый здесь, не то же самое что из <span className="spanTag">next/head</span>. {`<Head />`} Компонент, используемый здесь, должен использоваться только для любого {`<head>`} кода, который является общим для всех страниц. Во всех остальных случаях, таких как {`<title>`} теги, мы рекомендуем использовать <span className="spanTag">next/head</span> на своих страницах или компонентах.

<p>Этот <span className="spanTag">ctx</span> объект эквивалентен полученному <span className="spanTag">getInitialProps</span> с одним дополнением:</p>
<p className="list">
 - <span className="spanTag">renderPage: Function</span> - обратный вызов, который запускает фактическую логику рендеринга React (синхронно). Эту функцию полезно украсить для поддержки серверных оболочек рендеринга, таких как Aphrodite's renderStatic
</p>

<h2>Предостережения</h2>
<p className="list">
 - <span className="spanTag">Document</span> отображается только на сервере, обработчики событий вроде <span className="spanTag">onClick</span> не будут работать
</p>
<p className="list">
 - Компоненты React, находящиеся за пределами {`<Main />`}, не будут инициализированы браузером. Вы не добавить логику приложения здесь или пользовательские CSS (например styled-jsx). Если вам нужны общие компоненты на всех ваших страницах (например, меню или панель инструментов), взгляните на <span className="spanTag">App</span> компонент вместо этого.
</p>
<p className="list">
<span className="spanTag">Document getInitialProps</span> функция не вызывается при стороне клиента переходов, ни когда страница статически оптимизирована
</p>

<h2>Настройка <span className="spanTag">renderPage</span></h2>
<div className="note">
Следует отметить, что единственная причина, по которой вы должны настраиваться, <span className="spanTag">renderPage</span> - это использование с библиотеками css-in-js, которые должны оборачивать приложение для правильной работы с рендерингом на стороне сервера.
</div>

Он принимает в качестве аргумента объект параметров для дальнейшей настройки:

<Highlight language="node">
{`import Document from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const originalRenderPage = ctx.renderPage

    ctx.renderPage = () =>
      originalRenderPage({
        // useful for wrapping the whole react tree
        enhanceApp: (App) => App,
        // useful for wrapping in a per-page basis
        enhanceComponent: (Component) => Component,
      })

    // Run the parent 'getInitialProps', it now includes the custom 'renderPage'
    const initialProps = await Document.getInitialProps(ctx)

    return initialProps
  }
}

export default MyDocument`}
</Highlight>

<h2>Typescript</h2>
Вы можете использовать встроенный <span className="spanTag">DocumentContext</span> тип и изменить имя файла <span className="spanTag">./pages/_document.tsx</span> так:

<Highlight language="node">
{`import Document, { DocumentContext } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)

    return initialProps
  }
}

export default MyDocument`}
</Highlight>

            </div>
        </Docs>
    )
}