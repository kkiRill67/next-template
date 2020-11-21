import Docs from '../../../../../components/Docs/Docs'
import Highlight from 'react-highlight.js'


export default () => {
    return(
        <Docs>
            <div className="container">
<h1>Конфигурация среды выполнения</h1>

<div className="note">
Как правило, вы хотите использовать переменные среды времени сборки для предоставления вашей конфигурации. Причина этого в том, что конфигурация среды выполнения добавляет накладные расходы на рендеринг / инициализацию и несовместима с автоматической статической оптимизацией .
    </div>   

Чтобы добавить конфигурацию среды выполнения в ваше приложение, откройте next.config.js и добавьте конфигурации publicRuntimeConfig и serverRuntimeConfig:

<Highlight language="javascript">
{`module.exports = {
  serverRuntimeConfig: {
    // Will only be available on the server side
    mySecret: 'secret',
    secondSecret: process.env.SECOND_SECRET, // Pass through env variables
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    staticFolder: '/static',
  },
}`}
</Highlight>

Поместите любую конфигурацию времени выполнения только для сервера в serverRuntimeConfig.
<p>
Все, что доступно как для клиентского, так и для серверного кода, должно находиться под publicRuntimeConfig.
</p>

<div className="note">
Страница, на которой полагается, publicRuntimeConfig должна использоваться, getInitialProps чтобы отказаться от автоматической статической оптимизации. Конфигурация среды выполнения не будет доступна ни одной странице (или компоненту на странице) без getInitialProps.
</div>

Чтобы получить доступ к конфигурациям времени выполнения в вашем приложении, используйте next/config, например:

<Highlight language="javascript">
{`import getConfig from 'next/config'

// Only holds serverRuntimeConfig and publicRuntimeConfig
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()
// Will only be available on the server-side
console.log(serverRuntimeConfig.mySecret)
// Will be available on both server-side and client-side
console.log(publicRuntimeConfig.staticFolder)

function MyImage() {
  return (
    <div>
      <img src={\${publicRuntimeConfig.staticFolder}/logo.png} alt="logo" />
    </div>
  )
}

export default MyImage`}
</Highlight>

            </div>
        </Docs>
    )
}