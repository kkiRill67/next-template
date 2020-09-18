import Docs from '../../../components/Docs/Docs'
import Highlight from 'react-highlight.js'

export default function Index(props) {

    return(
        <Docs>
            <div className="container">
                <h1>Руководство по обновлению</h1>
            <h2>Обновление с версии 8 до 9.0.x</h2>
            <h3>Преамбула</h3>
        <h4>Развертывание производства на Vercel</h4>

<p>
Если вы ранее настроили routesв своем vercel.json файле динамические маршруты, эти правила можно удалить при использовании новой функции динамической маршрутизации Next.js 9.
</p>
<p>
Динамические маршруты Next.js 9 автоматически настраиваются на Vercel и не требуют vercel.json настройки.
</p>

Вы можете узнать больше о динамической маршрутизации здесь .

<h4>Проверьте свой Custom (pages/_app.js)</h4>

Если вы ранее скопировали пример Custom{`<App>`} , вы можете удалить свой getInitialProps.
<p>
Удаление getInitialProps из pages/_app.js(если возможно) важно для использования новых функций Next.js!
</p>

Следующее getInitialProps ничего не делает и может быть удалено:

<Highlight language="javascript">
{`class MyApp extends App {
  // Remove me, I do nothing!
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render() {
    // ... etc
  }
}`}
</Highlight>


<h3>Критические изменения</h3>

<h4>@zeit/next-typescript больше не нужно</h4>

Next.js теперь будет игнорировать использование @zeit/next-typescriptи предупредить вас об его удалении. Пожалуйста, удалите этот плагин из вашего next.config.js.
<p>
Удалите ссылки на @zeit/next-typescript/babel из вашего пользовательского .babelrc(если есть).
</p>

Использование fork-ts-checker-webpack-pluginтакже должно быть удалено из ваших next.config.js.
<p>
Определения TypeScript публикуются вместе с next пакетом, поэтому вам необходимо удалить их, @types/next поскольку они могут конфликтовать.
</p>

<p>Различаются следующие типы:</p>

<div className="note">
Этот список был создан сообществом, чтобы помочь вам выполнить обновление. Если вы обнаружите другие отличия, отправьте запрос на включение в этот список, чтобы помочь другим пользователям.
</div>

Из:
<Highlight language="node">
{`import { NextContext } from 'next'
import { NextAppContext, DefaultAppIProps } from 'next/app'
import { NextDocumentContext, DefaultDocumentIProps } from 'next/document'`}
</Highlight>

к
<Highlight language="node">
{`import { NextPageContext } from 'next'
import { AppContext, AppInitialProps } from 'next/app'
import { DocumentContext, DocumentInitialProps } from 'next/document'`}
</Highlight>

<h4>config Ключ теперь специальный экспорт на странице</h4>

Вы больше не можете экспортировать пользовательскую переменную, названную configсо страницы (например, export {`{ config }`}/ export const config ...). Эта экспортированная переменная теперь используется для указания конфигурации Next.js на уровне страницы, такой как функции Opt-in AMP и API Route.
<p>
Вы должны переименовать config экспорт, не предназначенный для Next.js, во что-нибудь другое.
</p>

<h4>next/dynamic больше не отображает "загружается ..." по умолчанию при загрузке</h4>

По умолчанию при загрузке динамические компоненты ничего не отображают. Вы все еще можете настроить это поведение, установив loadingсвойство:

<Highlight language="javascript">
{`import dynamic from 'next/dynamic'

const DynamicComponentWithCustomLoading = dynamic(
  () => import('../components/hello2'),
  {
    loading: () => <p>Loading</p>,
  }
)`}
</Highlight>

<h4>withAmp был удален в пользу экспортированного объекта конфигурации</h4>

Next.js теперь имеет концепцию конфигурации на уровне страницы, поэтому withAmp компонент более высокого порядка был удален для единообразия.

Это изменение можно автоматически перенести, выполнив следующие команды в корне вашего проекта Next.js:

<Highlight language="node">
{`curl -L https://github.com/vercel/next-codemod/archive/master.tar.gz | tar -xz --strip=2 next-codemod-master/transforms/withamp-to-config.js npx jscodeshift -t ./withamp-to-config.js pages/**/*.js`}
</Highlight>

Чтобы выполнить эту миграцию вручную или посмотреть, что создаст codemod, см. Ниже:
<p>Перед</p>


<Highlight language="javascript">
{`import { withAmp } from 'next/amp'

function Home() {
  return <h1>My AMP Page</h1>
}

export default withAmp(Home)
// or
export default withAmp(Home, { hybrid: true })`}
</Highlight>

После

<Highlight language="javascript">
{`export default function Home() {
  return <h1>My AMP Page</h1>
}

export const config = {
  amp: true,
  // or
  amp: 'hybrid',
}`}
</Highlight>


<h4>next export больше не экспортирует страницы как index.html</h4>

Раньше экспорт pages/about.jsприводил к out/about/index.html. Это поведение было изменено на out/about.html.
<p>
Вы можете вернуться к предыдущему поведению, создав объект next.config.js со следующим содержимым:
</p>

<Highlight language="node">
{`// next.config.js
module.exports = {
  exportTrailingSlash: true,
}`}
</Highlight>

<h4>./pages/api/ рассматривается по-другому</h4>

Страницы в ./pages/api/теперь считаются маршрутами API . Страницы в этом каталоге больше не будут содержать клиентский пакет.

<h2>Устаревшие функции</h2>
<h4>next/dynamic устарела загрузка нескольких модулей одновременно</h4>

Возможность загружать несколько модулей одновременно устарела, next/dynamicчтобы быть ближе к реализации React ( React.lazyи Suspense).
<p>
Обновить код, основанный на этом поведении, относительно просто! Мы предоставили пример до / после, чтобы помочь вам перенести приложение:
</p>

Перед

<Highlight language="javascript">
{`const HelloBundle = dynamic({
  modules: () => {
    const components = {
      Hello1: () => import('../components/hello1').then((m) => m.default),
      Hello2: () => import('../components/hello2').then((m) => m.default),
    }

    return components
  },
  render: (props, { Hello1, Hello2 }) => (
    <div>
      <h1>{props.title}</h1>
      <Hello1 />
      <Hello2 />
    </div>
  ),
})

function DynamicBundle() {
  return <HelloBundle title="Dynamic Bundle" />
}

export default DynamicBundle`}
</Highlight>

После

<Highlight language="javascript">
{`import dynamic from 'next/dynamic'

const Hello1 = dynamic(() => import('../components/hello1'))
const Hello2 = dynamic(() => import('../components/hello2'))

function HelloBundle({ title }) {
  return (
    <div>
      <h1>{title}</h1>
      <Hello1 />
      <Hello2 />
    </div>
  )
}

function DynamicBundle() {
  return <HelloBundle title="Dynamic Bundle" />
}

export default DynamicBundle`}
</Highlight>


            </div>
        </Docs>
    )
}