# Stream overlay

Este es un proyecto para crear algunos de los gráficos que aparecen en el [LIVE](https://www.tiktok.com/@lolzini_es/live).

## Cómo usar

Personalmente utilizo [OBS](https://obsproject.com/) para crear el live y utilizo `browser source` para agregar las diferentes fuentes de gráficos.

Por ejemplo `https://localhost:4321/` para agregar los gráficos principales `index.astro`

O `https://localhost:4321/background` para agregar los gráficos de fondo.

## Sobre las páginas

### index

Contiene los gráficos de el logo de Twitch y TikTok, Live y el nombre del canal.

### background

Contiene gráficos para usar como fondo.

### message/[message]

Contiene texto animado que puede ser cambiado mediante el `slug`.

El mensaje debe estar en formato URI, podemos usar `encodeURI()` dentro del navegador para obtener el texto necesario.

Por ejemplo: `Hola mundo` pasa a ser `Hola%20mundo`.

Entonces en el link debemos usar `http://localhost:4321/message/Hola%20mundo`

### projects

Contiene los gráficos animados que mencionan los links a redes sociales y el blog.
