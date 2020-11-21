import Docs from '../../../../../components/Docs/Docs'
import Highlight from 'react-highlight.js'


export default () => {
    return(
        <Docs>
            <div className="container">
<h1>Индикатор статической оптимизации</h1>
            
Когда страница соответствует требованиям для автоматической статической оптимизации, мы показываем индикатор, чтобы вы знали.

<p>
Это полезно, поскольку автоматическая статическая оптимизация может быть очень полезной, и может быть полезно знать сразу же в процессе разработки, соответствует ли страница требованиям.
</p>

В некоторых случаях этот индикатор может оказаться бесполезным, например, при работе с электронными приложениями. Чтобы удалить его, откройте next.config.js и отключите autoPrerender конфигурацию в devIndicators:

<Highlight language="javascript">
{`module.exports = {
  devIndicators: {
    autoPrerender: false,
  },
}`}
</Highlight>

            </div>
        </Docs>
    )
}