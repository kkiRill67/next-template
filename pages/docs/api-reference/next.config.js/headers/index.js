import Docs from '../../../../../components/Docs/Docs'
import Highlight from 'react-highlight.js'


export default () => {
    return(
        <Docs>
            <div className="container">
<h1>Заголовки</h1>
<div className="note">
Эта функция была представлена ​​в Next.js 9.5 и новее. Если вы используете более старые версии Next.js, обновите его, прежде чем пробовать.
</div>

Заголовки позволяют устанавливать собственные заголовки HTTP для пути входящего запроса.
<p>Чтобы установить собственные заголовки HTTP, вы можете использовать headersключ в next.config.js:</p>


<Highlight language="javascript">
{`module.exports = {
  async headers() {
    return [
      {
        source: '/about',
        headers: [
          {
            key: 'x-custom-header',
            value: 'my custom header value',
          },
          {
            key: 'x-another-custom-header',
            value: 'my other custom header value',
          },
        ],
      },
    ]
  },
}`}
</Highlight>

headers это функция, которая ожидает асинхронной массив должен быть возвращен держа объекты с sourceи headers свойствами:
<p className="list"> - source шаблон пути входящего запроса.</p>
<p className="list"> - headers представляет собой массив объектов заголовка с key и value свойствами.</p>

<h2>Поведение замещения заголовка</h2>

Если два заголовка соответствуют одному и тому же пути и задают один и тот же ключ заголовка, последний ключ заголовка будет иметь приоритет над первым. Используя приведенные ниже заголовки, путь /hello приведет к тому, что заголовок x-hello будет world соответствовать последнему заданному значению заголовка world.

<Highlight language="javascript">
{`module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'x-hello',
            value: 'there',
          },
        ],
      },
      {
        source: '/hello',
        headers: [
          {
            key: 'x-hello',
            value: 'world',
          },
        ],
      },
    ],
  },
}`}
</Highlight>

<h2>Соответствие пути</h2>

Допускаются совпадения путей, например /blog/:slugбудет совпадение /blog/hello-world(без вложенных путей):

<Highlight language="javascript">
{`module.exports = {
  async headers() {
    return [
      {
        source: '/blog/:slug',
        headers: [
          {
            key: 'x-slug',
            value: ':slug', // Matched parameters can be used in the value
          },
          {
            key: 'x-slug-:slug', // Matched parameters can be used in the key
            value: 'my other custom header value',
          },
        ],
      },
    ],
  },
}`}
</Highlight>

<h3>Сопоставление пути с подстановочными знаками</h3>

Чтобы сопоставить путь с подстановочными знаками, вы можете использовать его *после параметра, например, /blog/:slug* будет соответствовать /blog/a/b/c/d/hello-world:

<Highlight language="javascript">
{`module.exports = {
  async headers() {
    return [
      {
        source: '/blog/:slug*',
        headers: [
          {
            key: 'x-slug',
            value: ':slug*', // Matched parameters can be used in the value
          },
          {
            key: 'x-slug-:slug*', // Matched parameters can be used in the key
            value: 'my other custom header value',
          },
        ],
      },
    ],
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
        source: '/blog/:post(\\d{1,})',
        headers: [
          {
            key: 'x-post',
            value: ':post',
          },
        ],
      },
    ],
  },
}`}
</Highlight>

<h3>Заголовки с поддержкой basePath</h3>

При использовании basePathподдержки с заголовками каждый sourceавтоматически получает префикс, basePath если вы не добавляете basePath: false в заголовок:

<Highlight language="javascript">
{`module.exports = {
  basePath: '/docs',

  async headers() {
    return [
      {
        source: '/with-basePath', // becomes /docs/with-basePath
        headers: [
          {
            key: 'x-hello',
            value: 'world'
          }
        ]
      },
      {
        source: '/without-basePath', // is not modified since basePath: false is set
        headers: [
          {
            key: 'x-hello',
            value: 'world'
          }
        ]
        basePath: false
      },
    ]
  },
}`}
</Highlight>

            </div>
        </Docs>
    )
}