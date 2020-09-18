import Docs from '../../../../components/Docs/Docs'
import Highlight from 'react-highlight.js'


export default () => {
    return(
        <Docs>
            <div className="container">
                <h1>ПО промежуточного слоя API</h1>
            

Маршруты API предоставляют встроенное промежуточное ПО, которое анализирует входящий запрос ( req). Эти промежуточные программы:
<p className="list"> - req.cookies - Объект, содержащий файлы cookie, отправленные по запросу. По умолчанию{}</p>
<p className="list"> - req.query - Объект, содержащий строку запроса . По умолчанию{}</p>
<p className="list"> - req.body - объект, содержащий тело, проанализированное content-type или null если тело не было отправлено</p>


<h2>Пользовательская конфигурация</h2>

Каждый маршрут API может экспортировать configобъект для изменения конфигураций по умолчанию, а именно:

<Highlight language="javascript">
    {`export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
  },
}`}
</Highlight>

<p>
  api Объект включает в себя все конфиги, доступные для API маршрутов.  
</p>


bodyParser Включает синтаксический анализ тела, вы можете отключить его, если хотите использовать его как Stream:

<Highlight language="javascript">
    {`export const config = {
  api: {
    bodyParser: false,
  },
}`}
</Highlight>

bodyParser.sizeLimit - это максимальный размер, разрешенный для анализируемого тела, в любом формате, поддерживаемом байтами , например:
<Highlight language="javascript">
    {`export const config = {
  api: {
    bodyParser: {
      sizeLimit: '500kb',
    },
  },
}`}
</Highlight>

externalResolver - явный флаг, который сообщает серверу, что этот маршрут обрабатывается внешним преобразователем, таким как express или connect . Включение этой опции отключает предупреждения о неразрешенных запросах.

<Highlight language="javascript">
    {`export const config = {
  api: {
    externalResolver: true,
  },
}`}
</Highlight>

<h2>Поддержка промежуточного программного обеспечения Connect / Express</h2>
<p>Вы также можете использовать промежуточное ПО, совместимое с Connect.</p>
<p>Например, настройку CORS для конечной точки API можно выполнить с помощью пакета cors.</p>
<p>Сначала установите cors:</p>

<Highlight language="node">
    {`npm i cors
# or
yarn add cors`}
</Highlight>

Теперь давайте добавим corsк маршруту API:

<Highlight language="javascript">
    {`import Cors from 'cors'

// Initializing the cors middleware
const cors = Cors({
  methods: ['GET', 'HEAD'],
})

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

async function handler(req, res) {
  // Run the middleware
  await runMiddleware(req, res, cors)

  // Rest of the API logic
  res.json({ message: 'Hello Everyone!' })
}

export default handler`}
</Highlight>

<div className="note">Перейдите к примеру API Routes с CORS, чтобы увидеть готовое приложение.</div>

<h2>Расширение req/ resобъектов с помощью TypeScript</h2>

Для лучшей безопасности типов, не рекомендуются , чтобы продлить reqи resобъекты. Вместо этого используйте для работы с ними чистые функции:


<Highlight language="javascript">
    {`// utils/cookies.ts

import { serialize } from 'cookie'
import { NextApiResponse } from 'next'

/**
 * This sets 'cookie' using the 'res' object
 */

type Options = {
  expires?: Date
  maxAge?: number
}

export const setCookie = (
  res: NextApiResponse,
  name: string,
  value: unknown,
  options: Options = {}
) => {
  const stringValue =
    typeof value === 'object' ? 'j:' + JSON.stringify(value) : String(value)

  if ('maxAge' in options) {
    options.expires = new Date(Date.now() + options.maxAge)
    options.maxAge /= 1000
  }

  res.setHeader('Set-Cookie', serialize(name, String(stringValue), options))
}

// pages/api/cookies.ts

import { NextApiRequest, NextApiResponse } from 'next'
import { setCookie } from '../../utils/cookies'

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  // Calling our pure function using the 'res' object, it will add the 'set-cookie' header
  setCookie(res, 'Next.js', 'api-middleware!')
  // Return the 'set-cookie' header so we can display it in the browser and show that it works!
  res.end(res.getHeader('Set-Cookie'))
}

export default handler`}
</Highlight>

Если вы не можете избежать расширения этих объектов, вам нужно создать свой собственный тип, включающий дополнительные свойства:

<Highlight language="javascript">
    {`// pages/api/foo.ts

import { NextApiRequest, NextApiResponse } from 'next'
import { withFoo } from 'external-lib-foo'

type NextApiRequestWithFoo = NextApiRequest & {
  foo: (bar: string) => void
}

const handler = (req: NextApiRequestWithFoo, res: NextApiResponse) => {
  req.foo('bar') // we can now use 'req.foo' without type errors
  res.end('ok')
}

export default withFoo(handler)`}
</Highlight>

Имейте в виду, что это небезопасно, поскольку код все равно будет компилироваться, даже если вы удалите его withFoo()из экспорта.
            </div>
        </Docs>
    )
}