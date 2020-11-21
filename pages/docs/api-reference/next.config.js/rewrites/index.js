import Docs from '../../../../../components/Docs/Docs'
import Highlight from 'react-highlight.js'


export default () => {
    return(
        <Docs>
            <div className="container">
<h1>Перезапись</h1>
<div className="note">
Эта функция была представлена ​​в Next.js 9.5 и новее. Если вы используете более старые версии Next.js, обновите его, прежде чем пробовать.
</div>
Перезаписи позволяют сопоставить путь входящего запроса с другим путем назначения.
<p>Перезаписи доступны только в среде Node.js и не влияют на маршрутизацию на стороне клиента.</p>


Чтобы использовать перезапись, вы можете использовать rewritesключ в next.config.js:

<Highlight language="javascript">
{`module.exports = {
  async rewrites() {
    return [
      {
        source: '/about',
        destination: '/',
      },
    ]
  },
}`}
</Highlight>

rewrites - это функция , которая ожидает асинхронной массив должен быть возвращен держа объекты с sourceи destinationсвойствами:
<p className="list"> - source шаблон пути входящего запроса.</p>
<p className="list"> - destination -  это путь, по которому вы хотите проложить маршрут.</p>

<h2>Соответствие пути</h2>

Допускаются совпадения путей, например /blog/:slug будет совпадение /blog/hello-world (без вложенных путей):

<Highlight language="javascript">
{`module.exports = {
  async rewrites() {
    return [
      {
        source: '/blog/:slug',
        destination: '/news/:slug', // Matched parameters can be used in the destination
      },
    ]
  },
}`}
</Highlight>

<h3>Сопоставление пути с подстановочными знаками</h3>

Чтобы сопоставить путь с подстановочными знаками, вы можете использовать его *после параметра, например, /blog/:slug* будет соответствовать /blog/a/b/c/d/hello-world:

<Highlight language="javascript">
{`module.exports = {
  async rewrites() {
    return [
      {
        source: '/blog/:slug*',
        destination: '/news/:slug*', // Matched parameters can be used in the destination
      },
    ]
  },
}`}
</Highlight>

<h3>Соответствие пути регулярного выражения</h3>

Чтобы соответствовать пути регулярного выражения, вы можете заключить регулярное выражение в круглые скобки после параметра, например, /blog/:slug(\\d{`{1,}`}) будет соответствовать /blog/123, но не /blog/abc:

<Highlight language="javascript">
{`module.exports = {
  async rewrites() {
    return [
      {
        source: '/old-blog/:post(\\d{1,})',
        destination: '/blog/:post', // Matched parameters can be used in the destination
      },
    ]
  },
}`}
</Highlight>

<h2>Перезапись на внешний URL</h2>

Перезапись позволяет вам переписывать на внешний URL-адрес. Это особенно полезно для постепенного внедрения Next.js.

<Highlight language="javascript">
{`module.exports = {
  async rewrites() {
    return [
      {
        source: '/blog/:slug',
        destination: 'https://example.com/blog/:slug', // Matched parameters can be used in the destination
      },
    ]
  },
}`}
</Highlight>

<h3>Постепенное внедрение Next.js</h3>

Вы также можете заставить Next.js проверять маршруты приложения, прежде чем вернуться к проксированию на предыдущий веб-сайт.
<p>Таким образом, вам не нужно менять конфигурацию перезаписи при переносе дополнительных страниц на Next.js</p>


<Highlight language="javascript">
{`module.exports = {
  async rewrites() {
    return [
      // we need to define a no-op rewrite to trigger checking
      // all pages/static files before we attempt proxying
      {
        source: '/:path*',
        destination: '/:path*',
      },
      {
        source: '/:path*',
        destination: 'https://custom-routes-proxying-endpoint.vercel.app/:path*',
      },
    ]
  },
}`}
</Highlight>

<h3>Переписывает с поддержкой basePath</h3>

При использовании basePathподдержки с перезаписью каждый source и destination автоматически получает префикс, basePath если вы не добавите basePath: false в перезапись:

<Highlight language="javascript">
{`module.exports = {
  basePath: '/docs',

  async rewrites() {
    return [
      {
        source: '/with-basePath', // automatically becomes /docs/with-basePath
        destination: '/another', // automatically becomes /docs/another
      },
      {
        // does not add /docs since basePath: false is set
        source: '/without-basePath',
        destination: '/another',
        basePath: false,
      },
    ]
  },
}`}
</Highlight>


            </div>
        </Docs>
    )
}