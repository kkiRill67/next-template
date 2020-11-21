import Docs from '../../../../../components/Docs/Docs'
import Highlight from 'react-highlight.js'


export default () => {
    return(
        <Docs>
            <div className="container">
<h1>next/amp</h1>
Чтобы включить AMP, добавьте на свою страницу следующую конфигурацию:

<Highlight language="javascript">
{`export const config = { amp: true }`}
</Highlight>

amp Конфигурации принимает следующие значения:
<p className="list"> - true - Страница будет только AMP</p>
<p className="list"> - 'hybrid' - У страницы будет две версии: одна с AMP, а другая с HTML.</p>

Чтобы узнать больше о ampконфигурации, прочитайте разделы ниже.

<h2>Первая страница AMP</h2>

Взгляните на следующий пример:

<Highlight language="javascript">
{`export const config = { amp: true }

function About(props) {
  return <h3>My AMP About Page!</h3>
}

export default About`}
</Highlight>

Страница выше является страницей только для AMP, что означает:

<p className="list"> - На странице нет среды выполнения Next.js или React на стороне клиента.</p>
<p className="list"> - Страница автоматически оптимизируется с помощью AMP Optimizer , оптимизатора, который применяет те же преобразования, что и кеши AMP (повышает производительность до 42%).</p>
<p className="list"> - Страница имеет доступную для пользователя (оптимизированную) версию страницы и индексируемую поисковой системой (неоптимизированную) версию страницы.</p>

<h2>Гибридная AMP-страница</h2>
Взгляните на следующий пример:

<Highlight language="javascript">
{`import { useAmp } from 'next/amp'

export const config = { amp: 'hybrid' }

function About(props) {
  const isAmp = useAmp()

  return (
    <div>
      <h3>My AMP About Page!</h3>
      {isAmp ? (
        <amp-img
          width="300"
          height="300"
          src="/my-img.jpg"
          alt="a cool image"
          layout="responsive"
        />
      ) : (
        <img width="300" height="300" src="/my-img.jpg" alt="a cool image" />
      )}
    </div>
  )
}

export default About`}
</Highlight>

Страница выше представляет собой гибридную AMP-страницу, что означает:
<p className="list"> - Страница отображается как традиционный HTML (по умолчанию) и AMP HTML (путем добавления ?amp=1 в URL)</p>
<p className="list"> - AMP-версия страницы имеет только допустимую оптимизацию, примененную с AMP Optimizer, поэтому ее можно индексировать поисковыми системами.</p>


Страница использует useAmp для различения режимов, это React Hook, который возвращает true если страница использует AMP, и false противном случае.
            </div>
        </Docs>
    )
}