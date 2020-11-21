import Docs from '../../../../../components/Docs/Docs'
import Highlight from 'react-highlight.js'


export default () => {
    return(
        <Docs>
            <div className="container">
<h1>exportPathMap</h1> 
<div className="note">
Эта функция исключена next export. Если вы хотите узнать больше об этом, обратитесь к разделу «Экспорт статического HTML» .
</div>           


Начнем с примера, чтобы создать кастом exportPathMapдля приложения со следующими страницами:
<p className="list"> - pages/index.js</p>
<p className="list"> - pages/about.js</p>
<p className="list"> - pages/post.js</p>

Откройте next.config.js и добавьте следующий exportPathMap конфиг:

<Highlight language="javascript">
{`module.exports = {
  exportPathMap: async function (
    defaultPathMap,
    { dev, dir, outDir, distDir, buildId }
  ) {
    return {
      '/': { page: '/' },
      '/about': { page: '/about' },
      '/p/hello-nextjs': { page: '/post', query: { title: 'hello-nextjs' } },
      '/p/learn-nextjs': { page: '/post', query: { title: 'learn-nextjs' } },
      '/p/deploy-nextjs': { page: '/post', query: { title: 'deploy-nextjs' } },
    }
  },
}`}
</Highlight>

После этого страницы будут экспортированы как файлы HTML, например, /aboutстанут /about.html.

<p>
exportPathMap - это async функция, которая получает 2 аргумента: первый - defaultPathMap это карта по умолчанию, используемая Next.js. Второй аргумент - это объект с:
</p>

<p className="list"> - dev - true когда exportPathMap вызывается в разработке. false при беге next export. В разработке exportPathMap используется для определения маршрутов.</p>
<p className="list"> - dir - Абсолютный путь к каталогу проекта</p>
<p className="list"> - outDir - Абсолютный путь к out/ каталогу ( настраивается с помощью-o ). Когда dev это true значение outDir будет null.</p>
<p className="list"> - distDir - Абсолютный путь к .next/каталогу (настраивается с помощью distDir конфигурации)</p>
<p className="list"> - buildId - Сгенерированный идентификатор сборки</p>

Возвращаемый объект представляет собой карту страниц, где key- это, pathnameа value- это объект, который принимает следующие поля:
<p className="list"> - page: String - страница внутри pagesкаталога для рендеринга</p>
<p className="list"> - query: Object - query объект, переданный getInitialProps при предварительной отрисовке. По умолчанию{}</p>

<div className="note">
Экспортируемый pathname файл также может быть именем файла (например, /readme.md), но вам может потребоваться установить Content-Type заголовок text/html при обслуживании его содержимого, если он отличается от .html.
</div>

<h2>Добавление косой черты в конце</h2>

Можно настроить Next.js для экспорта страниц в виде index.html файлов и требовать завершения косой черты, /about становится /about/index.html и маршрутизируется через /about/. Это было поведение по умолчанию до Next.js 9.
<p>
Чтобы вернуться назад и добавить косую черту в конце, откройте next.config.js и включите exportTrailingSlash конфигурацию:
</p>

<Highlight language="javascript">
{`module.exports = {
  exportTrailingSlash: true,
}`}
</Highlight>

Настройка выходного каталога
next exportбудет использоваться outв качестве выходного каталога по умолчанию, вы можете настроить его с помощью -oаргумента, например:

<Highlight language="javascript">
{`next export -o outdir`}
</Highlight>

            </div>
        </Docs>
    )
}