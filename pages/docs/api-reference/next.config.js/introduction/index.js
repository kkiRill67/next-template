import Docs from '../../../../../components/Docs/Docs'
import Highlight from 'react-highlight.js'


export default () => {
    return(
        <Docs>
            <div className="container">
<h1>next.config.js</h1>
Для настраиваемого расширенного поведения Next.js вы можете создать <span className="spanTag">next.config.js</span> в корне каталога вашего проекта (рядом с package.json).
<p><span className="spanTag">next.config.js</span> - это обычный модуль Node.js, а не файл JSON. Он используется сервером Next.js и этапами сборки и не включается в сборку браузера.</p>


Взгляните на следующий <span className="spanTag">next.config.js</span> пример:

<Highlight language="javascript">
{`module.exports = {
  /* config options here */
}`}
</Highlight>

Вы также можете использовать функцию:

<Highlight language="javascript">
{`module.exports = (phase, { defaultConfig }) => {
  return {
    /* config options here */
  }
}`}
</Highlight>

phase - текущий контекст, в котором загружена конфигурация. Вы можете увидеть доступные этапы здесь. Фазы можно импортировать из <span className="spanTag">next/constants</span>:

<Highlight language="javascript">
{`const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

module.exports = (phase, { defaultConfig }) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      /* development only config options here */
    }
  }

  return {
    /* config options for all phases except development here */
  }
}`}
</Highlight>

<p>Закомментированные строки - это место, куда вы можете поместить разрешенные <span className="spanTag">next.config.js</span> конфигурации, которые определены здесь.</p>


Однако ни одна из конфигураций не требуется, и нет необходимости понимать, что делает каждая конфигурация, вместо этого поищите в этом разделе функции, которые вам нужно включить или изменить, и они покажут вам, что делать.
<p></p>
<div className="note">
 Избегайте использования новых функций JavaScript, недоступных в вашей целевой версии Node.js. <span className="spanTag">next.config.js</span> не будет анализироваться Webpack, Babel или TypeScript.   
</div>

            </div>
        </Docs>
    )
}