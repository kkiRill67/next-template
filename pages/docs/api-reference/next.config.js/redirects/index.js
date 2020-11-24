import Docs from '../../../../../components/Docs/Docs'
import Highlight from 'react-highlight.js'


export default () => {
    return(
        <Docs>
            <div className="container">
                <h1>Перенаправления</h1>
            <div className="note">
            Эта функция была представлена ​​в Next.js 9.5 и новее. Если вы используете более старые версии Next.js, обновите его, прежде чем пробовать.
            </div>

Перенаправления позволяют перенаправить путь входящего запроса на другой путь назначения.
<p>Перенаправления доступны только в среде Node.js и не влияют на маршрутизацию на стороне клиента.</p>


Чтобы использовать перенаправления, вы можете использовать <span className="spanTag">redirects</span> ключ в next.config.js:

<Highlight language="javascript">
{`module.exports = {
  async redirects() {
    return [
      {
        source: '/about',
        destination: '/',
        permanent: true,
      },
    ]
  },
}`}
</Highlight>

<span className="spanTag">redirects</span> - это функция , которая ожидает асинхронной массив должен быть возвращен держит объекты с <span className="spanTag">source</span>, <span className="spanTag">destination</span> и <span className="spanTag">permanent</span> свойства:
<p className="list"> - source шаблон пути входящего запроса.</p>
<p className="list"> - destination это путь, по которому вы хотите проложить маршрут.</p>
<p className="list"> - permanent если перенаправление постоянное или нет.</p>

<h2>Соответствие пути</h2>
Допускаются совпадения путей, например /old-blog/:slug будет совпадение /old-blog/hello-world (без вложенных путей):

<Highlight language="javascript">
{`module.exports = {
  async redirects() {
    return [
      {
        source: '/old-blog/:slug',
        destination: '/news/:slug', // Matched parameters can be used in the destination
        permanent: true,
      },
    ]
  },
}`}
</Highlight>

<h3>Сопоставление пути с подстановочными знаками</h3>

Чтобы сопоставить путь с подстановочными знаками, вы можете использовать его после <span className="spanTag">*</span> параметра, например, /blog/:slug* будет соответствовать /blog/a/b/c/d/hello-world:

<Highlight language="javascript">
{`module.exports = {
  async redirects() {
    return [
      {
        source: '/blog/:slug*',
        destination: '/news/:slug*', // Matched parameters can be used in the destination
        permanent: true,
      },
    ]
  },
}`}
</Highlight>

<h3>Соответствие пути регулярного выражения</h3>

Чтобы соответствовать пути регулярного выражения, вы можете заключить регулярное выражение в круглые скобки после параметра, например, /blog/:slug(\\d{`{1,}`}) будет соответствовать, /blog/123, но не /blog/abc:

<Highlight language="javascript">
{`module.exports = {
  async redirects() {
    return [
      {
        source: '/old-blog/:post(\\d{1,})',
        destination: '/blog/:post', // Matched parameters can be used in the destination
        permanent: false,
      },
    ]
  },
}`}
</Highlight>

<h3>Перенаправления с поддержкой basePath</h3>

При использовании <span className="spanTag">basePath</span> поддержки с перенаправлениями каждый <span className="spanTag">source</span> и <span className="spanTag">destination</span> автоматически получает префикс, <span className="spanTag">basePath</span> если вы не добавите <span className="spanTag">basePath: false</span> в перенаправление:

<Highlight language="javascript">
{`module.exports = {
  basePath: '/docs',

  async redirects() {
    return [
      {
        source: '/with-basePath', // automatically becomes /docs/with-basePath
        destination: '/another', // automatically becomes /docs/another
        permanent: false,
      },
      {
        // does not add /docs since basePath: false is set
        source: '/without-basePath',
        destination: '/another',
        basePath: false,
        permanent: false,
      },
    ]
  },
}`}
</Highlight>

В некоторых редких случаях вам может потребоваться назначить пользовательский код состояния для более старых HTTP-клиентов для правильного перенаправления. В этих случаях вы можете использовать <span className="spanTag">statusCode</span> свойство вместо <span className="spanTag">permanent</span> свойства, но не то и другое одновременно. Примечание: для обеспечения совместимости с IE11 Refresh автоматически добавляется заголовок для кода состояния 308.
            </div>
        </Docs>
    )
}