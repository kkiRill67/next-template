import Docs from '../../../../../components/Docs/Docs'
import Highlight from 'react-highlight.js'


export default () => {
    return(
        <Docs>
            <div className="container">
<h1>Пользовательская конфигурация Webpack</h1>
            
Прежде чем продолжить добавление пользовательской конфигурации веб-пакета в ваше приложение, убедитесь, что Next.js еще не поддерживает ваш вариант использования:

<p className="list"> - CSS импорт</p>
<p className="list"> - CSS модули</p>
<p className="list"> - Импорт Sass / SCSS</p>
<p className="list"> - Модули Sass / SCSS</p>
<p className="list"> - preact</p>
<p className="list"> - Настройка конфигурации babel</p>

Некоторые часто запрашиваемые функции доступны в виде плагинов:
<p className="list"> - @zeit/next-less</p>
<p className="list"> - @next/mdx</p>
<p className="list"> - @next/bundle-analyzer</p>

Чтобы расширить наше использование webpack, вы можете определить функцию, которая расширяет ее конфигурацию внутри next.config.js, например:

<Highlight language="javascript">
{`module.exports = {
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Note: we provide webpack above so you should not 'require' it
    // Perform customizations to webpack config
    config.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//))

    // Important: return the modified config
    return config
  },
}`}
</Highlight>

<div className="note">
webpack Функция выполняется дважды, один раз для сервера и один раз для клиента. Это позволяет вам различать конфигурацию клиента и сервера с помощью isServer свойства.
</div>

Второй аргумент webpack функции - это объект со следующими свойствами:
<p className="list"> - <strong>buildId: String</strong> - Идентификатор сборки, используемый как уникальный идентификатор между сборками</p>
<p className="list"> - <strong>dev: Boolean</strong> - Указывает, будет ли компиляция выполняться в разработке</p>
<p className="list"> - <strong>isServer: Boolean</strong> - Это true для компиляции на стороне сервера и false для компиляции на стороне клиента</p>
<p className="list">
 - <strong>defaultLoaders: Object</strong> - Загрузчики по умолчанию, используемые внутри Next.js:
    <p className="list"> - <strong>babel: Object</strong> - babel-loader Конфигурация по умолчанию</p>    
</p>

Пример использования defaultLoaders.babel:

<Highlight language="javascript">
{`// Example config for adding a loader that depends on babel-loader
// This source was taken from the @next/mdx plugin source:
// https://github.com/vercel/next.js/tree/canary/packages/next-mdx
module.exports = {
  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.mdx/,
      use: [
        options.defaultLoaders.babel,
        {
          loader: '@mdx-js/loader',
          options: pluginOptions.options,
        },
      ],
    })

    return config
  },
}`}
</Highlight>

            </div>
        </Docs>
    )
}