import Docs from '../../../../../components/Docs/Docs'
import Highlight from 'react-highlight.js'


export default () => {
    return(
        <Docs>
            <div className="container">
<h1>Build Target</h1>

Next.js поддерживает различные цели сборки, каждая из которых меняет способ создания и запуска вашего приложения. Мы объясним каждую из целей ниже.

<h2>server target</h2>
<div className="note">
Это цель по умолчанию, однако, мы настоятельно рекомендуем <span className="spanTag">serverless target</span>. serverless target навязывает дополнительные ограничения, чтобы держать вас в Яме успеха.
</div>

Эта цель совместима как с настраиваемыми серверами, так и  <span className="spanTag">next start</span> с настраиваемыми (это обязательно для настраиваемого сервера).
<p>
Ваше приложение будет создано и развернуто как монолит. Это цель по умолчанию, и с вашей стороны не требуется никаких действий для включения.
</p>

<h2>serverless target</h2>
<div className="note">
Развертывания в Vercel автоматически активируют эту цель. Вы не должны соглашаться на это самостоятельно.
</div>

Эта цель будет выводить независимые страницы, для которых не требуется монолитный сервер.
<p>
Он совместим только с <span className="spanTag">next start</span> платформами бессерверного развертывания или с платформами развертывания (например, Vercel) - вы не можете использовать настраиваемый серверный API.
</p>

Чтобы выбрать эту цель, установите следующую конфигурацию в своем next.config.js:


<Highlight language="javascript">
{`module.exports = {
  target: 'serverless',
}`}
</Highlight>

            </div>
        </Docs>
    )
}