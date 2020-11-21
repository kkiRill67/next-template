import Docs from '../../../../../components/Docs/Docs'
import Highlight from 'react-highlight.js'


export default () => {
    return(
        <Docs>
            <div className="container">
<h1>Игнорирование ошибок TypeScript</h1>
            
Next.js дает сбой вашей производственной сборки ( next build), если в вашем проекте присутствуют ошибки TypeScript.

<p>
Если вы хотите, чтобы Next.js создавал опасный производственный код, даже если в вашем приложении есть ошибки, вы можете отключить встроенный шаг проверки типов.
</p>
<div className="note">
 Убедитесь, что вы выполняете проверку типов как часть процесса сборки или развертывания, иначе это может быть очень опасно.   
</div>


Откройте next.config.js и включите ignoreBuildErrors опцию в typescript конфиге:

<Highlight language="javascript">
{`module.exports = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
}`}
</Highlight>

            </div>
        </Docs>
    )
}