import Docs from '../../../../components/Docs/Docs'
import Highlight from 'react-highlight.js'

export default function Index(props) {

    return(
        <Docs>
            <div className="container">
                <h1>Измерение производительности</h1>
            
Next.js имеет встроенный ретранслятор, который позволяет анализировать и измерять производительность страниц с использованием различных показателей.
<p>
Чтобы измерить любую из поддерживаемых метрик, вам нужно будет создать настраиваемый компонент приложения и определить reportWebVitals функцию:
</p>

<Highlight language="javascript">
{`// pages/_app.js
export function reportWebVitals(metric) {
  console.log(metric)
}

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp`}
</Highlight>


Эта функция запускается, когда окончательные значения для любого из показателей завершили расчет на странице. Вы можете использовать для записи любых результатов на консоль или для отправки на конкретную конечную точку.

<p>
metric Объект возвращается к функции состоит из ряда свойств:
</p>
<p className="list">
 - id: Уникальный идентификатор показателя в контексте текущей загрузки страницы.
</p>
<p className="list">
 - name: Название метрики
</p>
<p className="list">
 - startTime: Первая записанная временная метка записи о производительности в миллисекундах (если применимо)
</p>
<p className="list">
 - value: Значение, или длительность в миллисекундах , в записи производительности
</p>
<p className="list">
 - label: Тип метрики ( web-vitalили custom)
</p>

Отслеживаются два типа показателей:

<p className="list"> - Web Vitals</p>
<p className="list"> - Пользовательские показатели</p>

<h2>Web Vitals</h2>

Web Vitals - это набор полезных показателей, которые призваны фиксировать пользовательский опыт веб-страницы. Включены все следующие веб-показатели:

<p className="list"> - Время до первого байта (TTFB)</p>
<p className="list"> - Первая содержательная краска (FCP)</p>
<p className="list"> - Самая большая содержательная краска (LCP)</p>
<p className="list"> - Задержка первого входа (FID)</p>
<p className="list"> - Накопительный сдвиг макета (CLS)</p>

Вы можете обрабатывать все результаты этих показателей с помощью web-vitalметки:

<Highlight language="javascript">
{`export function reportWebVitals(metric) {
  if (metric.label === 'web-vital') {
    console.log(metric) // The metric object ({ id, name, startTime, value, label }) is logged to the console
  }
}`}
</Highlight>

Также есть возможность обрабатывать каждую метрику отдельно:

<Highlight language="javascript">
{`export function reportWebVitals(metric) {
  switch (metric.name) {
    case 'FCP':
      // handle FCP results
      break
    case 'LCP':
      // handle LCP results
      break
    case 'CLS':
      // handle CLS results
      break
    case 'FID':
      // handle FID results
      break
    case 'TTFB':
      // handle TTFB results
      break
    default:
      break
  }
}`}
</Highlight>

Для измерения этих показателей используется сторонняя библиотека web-vitals . Совместимость браузера зависит от конкретной метрики, поэтому обратитесь к разделу « Поддержка браузеров», чтобы узнать, какие браузеры поддерживаются.


<h2>Пользовательские показатели</h2>

Помимо основных показателей, перечисленных выше, есть несколько дополнительных настраиваемых показателей, которые измеряют время, необходимое странице для гидратации и рендеринга:

<p className="list">
 - Next.js-hydration: Время, необходимое для страницы, чтобы начать и закончить увлажнение (в мс)
</p>
<p className="list">
 - Next.js-route-change-to-render: Время, необходимое для начала отрисовки страницы после изменения маршрута (в мс)
</p>
<p className="list">
 - Next.js-render: Время, необходимое для завершения рендеринга страницы после изменения маршрута (в мс)
</p>

Вы можете обрабатывать все результаты этих показателей с помощью custom метки:

<Highlight language="javascript">
{`export function reportWebVitals(metric) {
  if (metric.label === 'custom') {
    console.log(metric) // The metric object ({ id, name, startTime, value, label }) is logged to the console
  }
}`}
</Highlight>

Также есть возможность обрабатывать каждую метрику отдельно:

<Highlight language="javascript">
{`export function reportWebVitals(metric) {
  switch (metric.name) {
    case 'Next.js-hydration':
      // handle hydration results
      break
    case 'Next.js-route-change-to-render':
      // handle route-change to render results
      break
    case 'Next.js-render':
      // handle render results
      break
    default:
      break
  }
}`}
</Highlight>

Эти метрики работают во всех браузерах, поддерживающих User Timing API .

<h2>Отправка результатов в аналитику</h2>

С помощью функции ретрансляции вы можете отправлять любые результаты в конечную точку аналитики для измерения и отслеживания реальной эффективности пользователей на вашем сайте. Например:


<Highlight language="javascript">
{`export function reportWebVitals(metric) {
  const body = JSON.stringify(metric)
  const url = 'https://example.com/analytics'

  // Use navigator.sendBeacon()' if available, falling back to 'fetch()'.
  if (navigator.sendBeacon) {
    navigator.sendBeacon(url, body)
  } else {
    fetch(url, { body, method: 'POST', keepalive: true })
  }
}`}
</Highlight>

<div className="note">
Примечание . Если вы используете Google Analytics , использование idзначения может позволить вам создавать распределения показателей вручную (для расчета процентилей и т. Д.).
<Highlight language="javascript">
{`export function reportWebVitals({ id, name, label, value }) {
  // Use 'window.gtag' if you initialized Google Analytics as this example:
  // https://github.com/vercel/next.js/blob/canary/examples/with-google-analytics/pages/_document.js
  window.gtag('event', name, {
    event_category:
      label === 'web-vital' ? 'Web Vitals' : 'Next.js custom metric',
    value: Math.round(name === 'CLS' ? value * 1000 : value), // values must be integers
    event_label: id, // id unique to current page load
    non_interaction: true, // avoids affecting bounce rate.
  })
}`}
</Highlight>
Подробнее об отправке результатов в Google Analytics читайте здесь .
</div>

<h2>TypeScript</h2>
Если вы используете TypeScript, вы можете использовать встроенный тип NextWebVitalsMetric:

<Highlight language="javascript">
{`// pages/_app.tsx

import type { AppProps, NextWebVitalsMetric } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export function reportWebVitals(metric: NextWebVitalsMetric) {
  console.log(metric)
}

export default MyApp`}
</Highlight>

            </div>
        </Docs>
    )
}