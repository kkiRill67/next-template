import Docs from '../../../../../components/Docs/Docs'
import Highlight from 'react-highlight.js'


export default () => {
    return(
        <Docs>
            <div className="container">
<h1>Установка пользовательского каталога сборки</h1>
            
Вы можете указать имя, которое будет использоваться для настраиваемого каталога сборки вместо .next.
<p>Открываем next.config.js и добавляем distDir конфиг:</p>


<Highlight language="javascript">
{`module.exports = {
  distDir: 'build',
}`}
</Highlight>

Теперь, если вы запустите next buildNext.js будет использовать build вместо .next папки по умолчанию .
<p></p>
<div className="note">distDir не должен покидать каталог вашего проекта. Например, ../build является недействительным каталог.</div>

            </div>
        </Docs>
    )
}