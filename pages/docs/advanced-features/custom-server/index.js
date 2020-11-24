import Docs from '../../../../components/Docs/Docs'
import Highlight from 'react-highlight.js'

export default function Index(props) {

    return(
        <Docs>
            <div className="container">
                <h1>Пользовательский сервер</h1>
            
<p>
Обычно следующий сервер запускается с расширением <span className="spanTag">next start</span>. Однако возможно запустить сервер на 100% программно, чтобы использовать собственные шаблоны маршрутов.
</p>
<div className="note">
Пользовательский сервер не может быть развернут на Vercel, для которой была создана платформа Next.js.
</div>
<div className="note">
Прежде чем принять решение об использовании собственного сервера, имейте в виду, что его следует использовать только в том случае, если встроенный маршрутизатор Next.js не соответствует требованиям вашего приложения. Пользовательский сервер удалит важные оптимизации производительности, такие как бессерверные функции и автоматическая статическая оптимизация.
</div>
<p>Взгляните на следующий пример настраиваемого сервера:</p>


<Highlight language="node">
{`// server.js
const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  createServer((req, res) => {
    // Be sure to pass 'true' as the second argument to 'url.parse'.
    // This tells it to parse the query portion of the URL.
    const parsedUrl = parse(req.url, true)
    const { pathname, query } = parsedUrl

    if (pathname === '/a') {
      app.render(req, res, '/a', query)
    } else if (pathname === '/b') {
      app.render(req, res, '/b', query)
    } else {
      handle(req, res, parsedUrl)
    }
  }).listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})`}
</Highlight>

<div className="note">
<span className="spanTag">server.js</span> не проходит через babel или webpack. Убедитесь, что синтаксис и источники, необходимые для этого файла, совместимы с текущей версией вашего узла.
</div>
<p>
Затем, чтобы запустить собственный сервер вам необходимо обновить <span className="spanTag">scripts</span> и <span className="spanTag">package.json</span>, например, так:
</p>

<Highlight language="json">
{`"scripts": {
  "dev": "node server.js",
  "build": "next build",
  "start": "NODE_ENV=production node server.js"
}`}
</Highlight>

Пользовательский сервер использует следующий импорт для подключения сервера к приложению Next.js:

<Highlight language="node">
{`const next = require('next')
const app = next({})`}
</Highlight>
<hr/>
Вышеупомянутый <span className="spanTag">next импорт</span> - это функция, которая получает объект со следующими параметрами:

<p className="list">
 - <span className="spanTag">dev: Boolean</span> - Запускать Next.js в режиме разработки или нет. По умолчанию false
</p>
<p className="list">
 - <span className="spanTag">dir: String</span> - Расположение проекта Next.js. По умолчанию'.'
</p>
<p className="list">
 - <span className="spanTag">quiet: Boolean</span> - Скрыть сообщения об ошибках, содержащие информацию о сервере. По умолчанию false
</p>
<p className="list">
 - <span className="spanTag">conf: object</span> - Тот же объект, который вы использовали бы в <span className="spanTag">next.config.js</span>. По умолчанию {`{}`}
</p>
Затем возвращенные данные <span className="spanTag">app</span> можно использовать, чтобы Next.js обрабатывал запросы по мере необходимости.

<h2>Отключение маршрутизации файловой системы</h2>

По умолчанию Next будет обслуживать каждый файл в <span className="spanTag">pages</span> папке под именем, совпадающим с именем файла. Если в вашем проекте используется настраиваемый сервер, такое поведение может привести к тому, что один и тот же контент будет обслуживаться по разным путям, что может вызвать проблемы с SEO и UX.
<p>
Чтобы отключить это поведение и предотвратить маршрутизацию на основе файлов <span className="spanTag">pages</span>, откройте <span className="spanTag">next.config.js</span> и отключите <span className="spanTag">useFileSystemPublicRoutes</span> конфигурацию:
</p>

<Highlight language="node">
{`module.exports = {
  useFileSystemPublicRoutes: false,
}`}
</Highlight>


<div className="note">
Обратите внимание, что <span className="spanTag">useFileSystemPublicRoutes</span> отключает маршруты имен файлов из SSR; маршрутизация на стороне клиента может по-прежнему обращаться к этим путям. При использовании этой опции вам следует принять меры против навигации по маршрутам, которые вам не нужны программно.
</div>
<div className="note">
Вы также можете настроить маршрутизатор на стороне клиента, чтобы запретить перенаправление на стороне клиента на маршруты к именам файлов; для этого обратитесь к <span className="spanTag">router.beforePopState</span>.
</div>

            </div>
        </Docs>
    )
}