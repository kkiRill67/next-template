import Docs from '../../../../../components/Docs/Docs'
import Highlight from 'react-highlight.js'


export default () => {
    return(
        <Docs>
            <div className="container">
<h1>Настройка идентификатора сборки</h1>
            
Next.js использует постоянный идентификатор, сгенерированный во время сборки, чтобы определить, какая версия вашего приложения обслуживается. Это может вызвать проблемы при развертывании на нескольких серверах, если оно next build выполняется на каждом сервере. Чтобы сохранить статический идентификатор сборки между сборками, вы можете указать свой собственный идентификатор сборки.
<p>Откройте next.config.js и добавьте generateBuildId функцию:</p>

<Highlight language="javascript">
{`module.exports = {
  generateBuildId: async () => {
    // You can, for example, get the latest git commit hash here
    return 'my-build-id'
  },
}`}
</Highlight>


            </div>
        </Docs>
    )
}