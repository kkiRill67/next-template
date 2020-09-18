import Docs from '../../../../components/Docs/Docs'
import Highlight from 'react-highlight.js'

export default () => {
    return(
        <Docs>
            <div className="container">
                <h1>TypeScript</h1>
                <p>
                Next.js предоставляет интегрированный интерфейс TypeScript " из коробки", аналогичный IDE.
                </p>
<p>
Для начала создайте пустой tsconfig.json файл в корне вашего проекта:
</p>

<Highlight language="node">
    {`touch tsconfig.json`}
</Highlight>

<p>
Next.js автоматически настроит этот файл со значениями по умолчанию. Предоставление самостоятельно tsconfig.json с настраиваемыми опциями компилятора также поддерживается.
</p>
<div className='note'>
Next.js использует Babel для обработки TypeScript, который имеет некоторые оговорки, а некоторые параметры компилятора обрабатываются по-другому.
</div>
<p>
Затем запустите next(обычно npm run devили yarn dev), и Next.js проведет вас через установку необходимых пакетов для завершения установки:
</p>

<Highlight language="node">
    {`npm run dev

# You'll see instructions like these:
#
# Please install typescript, @types/react, and @types/node by running:
#
# yarn add --dev typescript @types/react @types/node
#
# ...`}
</Highlight>

<p>
Теперь вы готовы начать преобразование файлов из формата .js в .tsx формат и использовать его преимущества!.
</p>
<div className='note'>
В next-env.d.ts корне вашего проекта будет создан файл с именем. Этот файл гарантирует, что типы Next.js подбираются компилятором TypeScript. Вы не можете удалить его , но можете отредактировать (но в этом нет необходимости).
</div>
<div className='note'>
По умолчанию strict режим Next.js отключен. Когда вы освоитесь с TypeScript, рекомендуется включить его в вашем tsconfig.json.
</div>
<p>
По умолчанию Next.js выполняет проверку типов как часть next build. Мы рекомендуем использовать проверку типов в редакторе кода во время разработки.
</p>
<p>
Если вы хотите отключить отчеты об ошибках, обратитесь к документации по игнорированию ошибок TypeScript.
</p>

<h2>
Статическая генерация и рендеринг на стороне сервера
</h2>
Для getStaticProps, getStaticPaths и getServerSideProps вы можете использовать GetStaticProps, GetStaticPaths и GetServerSideProps тип, соответственно:


<Highlight language="javascript">
    {`import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'

export const getStaticProps: GetStaticProps = async (context) => {
  // ...
}

export const getStaticPaths: GetStaticPaths = async () => {
  // ...
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  // ...
}`}
</Highlight>

<div className='note'>
Если вы используете getInitialProps, вы можете следовать инструкциям на этой странице .
</div>


<h2>
API-маршруты
</h2>
Ниже приводится пример того, как использовать встроенные типы для маршрутов API:

<Highlight language="javascript">
    {`import { NextApiRequest, NextApiResponse } from 'next'

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ name: 'John Doe' })
}
Вы также можете ввести данные ответа:

import { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

export default (req: NextApiRequest, res: NextApiResponse<Data>) => {
  res.status(200).json({ name: 'John Doe' })
}`}
</Highlight>

<h2>
На заказ App
</h2>

Если у вас есть заказ App , вы можете использовать встроенный тип AppProps и изменить имя файла ./pages/_app.tsx так:


<Highlight language="javascript">
    {`// import App from "next/app";
import type { AppProps /*, AppContext */ } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext: AppContext) => {
//   // calls page's 'getInitialProps' and fills 'appProps.pageProps'
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps }
// }

export default MyApp`}
</Highlight>

<h2>
Псевдонимы пути и baseUrl
</h2>
<p>
Next.js автоматически поддерживает параметры tsconfig.json "paths"и "baseUrl".
</p>
Вы можете узнать больше об этой функции в документации по псевдонимам пути к модулю .
            </div>
        </Docs>
    )
}