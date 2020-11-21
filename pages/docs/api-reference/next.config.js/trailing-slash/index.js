import Docs from '../../../../../components/Docs/Docs'
import Highlight from 'react-highlight.js'


export default () => {
    return(
        <Docs>
            <div className="container">
<h1>Trailing Slash</h1>

<div className="note">
Эта функция была представлена ​​в Next.js 9.5 и новее. Если вы используете более старые версии Next.js, обновите его, прежде чем пробовать.
</div> 

По умолчанию Next.js перенаправляет URL-адреса с завершающей косой чертой на их аналог без косой черты. Например /about/, перенаправит на /about. Вы можете настроить это поведение таким образом, чтобы оно действовало противоположным образом, когда URL-адреса без конечных косых черт перенаправляются на их аналоги с конечными косыми чертами.

<p>
   Открываем next.config.js и добавляем trailingSlash конфиг: 
</p>


<Highlight language="javascript">
{`module.exports = {
  trailingSlash: true,
}`}
</Highlight>

Если этот параметр установлен, такие URL-адреса /about будут перенаправлены на /about/.
            </div>
        </Docs>
    )
}