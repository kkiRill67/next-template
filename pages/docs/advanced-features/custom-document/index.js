import Docs from '../../../../components/Docs/Docs'
import Highlight from 'react-highlight.js'

export default function Index(props) {

    return(
        <Docs>
            <div className="container">
                <h1>На заказ Document</h1>
            
Пользовательские Documentнастройки обычно используются для расширения тегов {`<html>`}и {`<body>`} тегов вашего приложения . Это необходимо, потому что страницы Next.js пропускают определение разметки окружающего документа.
<p>
Чтобы переопределить значение по умолчанию Document, создайте файл ./pages/_document.js и расширьте Document класс, как показано ниже:
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
Приведенный выше код по умолчанию Document добавлен Next.js. Не стесняйтесь удалять функцию getInitialProps или, если вам не нужно их менять .renderMyDocument
</div>

{`<Html>`}, {`<Head />`}, {`<Main />`} и {`<NextScript />`} необходимы для страницы , чтобы надлежащим образом оказана.

<p>Пользовательские атрибуты разрешены как реквизиты, например lang:</p>


<Highlight language="html">
{`<Html lang="en">`}
</Highlight>

{`<Head />`} Компонент , используемый здесь , не то же самое один из next/head. {`<Head />`} Компонент , используемый здесь , должен использоваться только для любого {`<head>`} кода, который является общим для всех страниц. Во всех остальных случаях, таких как {`<title>`} теги, мы рекомендуем использовать next/headна своих страницах или компонентах.

<p>Этот ctxобъект эквивалентен полученному getInitialProps с одним дополнением:</p>
<p className="list">
 - renderPage: Function - обратный вызов, который запускает фактическую логику рендеринга React (синхронно). Эту функцию полезно украсить для поддержки серверных оболочек рендеринга, таких как Aphrodite's renderStatic
</p>

<h2>Предостережения</h2>
<p className="list">
 - Document отображается только на сервере, обработчики событий вроде onClickне будут работать
</p>
<p className="list">
 - Компоненты React, находящиеся за пределами {`<Main />`}, не будут инициализированы браузером. Вы не добавить логику приложения здесь или пользовательские CSS (например styled-jsx). Если вам нужны общие компоненты на всех ваших страницах (например, меню или панель инструментов), взгляните на App компонент вместо этого.
</p>
<p className="list">
Document getInitialProps функция не вызывается при стороне клиента переходов, ни когда страница статически оптимизирована
</p>

<h2>Настройка renderPage</h2>
<div className="note">
Следует отметить, что единственная причина, по которой вы должны настраиваться, renderPage - это использование с библиотеками css-in-js, которые должны оборачивать приложение для правильной работы с рендерингом на стороне сервера.
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
Вы можете использовать встроенный DocumentContext тип и изменить имя файла ./pages/_document.tsx так:

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