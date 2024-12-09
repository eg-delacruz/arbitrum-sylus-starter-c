# \***\*🌐Hackaton Crypto 42\*\***!

![enter image description here](https://i.imgur.com/SBdzVMx.png)

## **🚀**Informe de proyecto: Etherra

\*📝 **Resumen del proyecto\***

**Etherra** es una App diseñada para transformar la gestión de terrenos mediante el uso de blockchain. Utilizando tecnologías como **Arbitrum** y su software **Stylus**, que permite escribir contratos inteligentes compatibles con EVM en Rust y cualquier otro lenguaje que se compile en Wasm, por ejemplo **C**. La plataforma ofrece una solución descentralizada, transparente y segura para el registro de terrenos. A través de una interfaz intuitiva, los usuarios pueden conectar sus wallets, interactuar con contratos inteligentes y gestionar su información de propiedad de manera inmutable.

## 🔍 **Introducción**

Los sistemas tradicionales de gestión de terrenos son ineficientes, costosos y propensos al fraude. **Etherra** utiliza blockchain para superar estas limitaciones, ofreciendo una solución digital que prioriza la transparencia, la escalabilidad y la accesibilidad global.

## 🛠 **Descripción del Proyecto**

\*🎯 **Objetivo Principal\***
Modernizar el registro de terrenos con una plataforma descentralizada que brinde seguridad, trazabilidad y accesibilidad.

### ✨ **Funcionalidades Clave**

- **Registro de Propiedad:** Registro de terrenos asociado a un hash único generado a partir del DNI y de la ubicación en [3 palabras del terreno](https://what3words.com).
- **Verificación de la propiedad:** Verificación de la propiedad de un terreno en base al DNI.

## ¿Qué es what3words?

Para crear este proyecto, hemos utilizado la plataforma de what3words, que han dividio el mundo en cuadrados de 3 x 3 m y han asignado a cada uno de ellos una combinación única de tres palabras. De esta manera simplificamos la definición de un terreno.

## 🏗 **Arquitectura del Proyecto**

- Frontend: **Next.js**, **React**, **Tailwind CSS** **TypeScript**
- Backend: **Stylus-Arbitrum**, **C para la creación del smart contract**

## Funcionamiento técnico

En nuestro smart contract se almacena un hash único generado a partir del DNI, de las 3 palabras, y de la wallet del usuario. Una vez que el "agente verificador" certifica que un terreno pertenece efectivamente al dueño del DNI, este hash se almacena en el contrato inteligente. Para verificar si una persona es dueña o no de un terreno, se debe ingresar el DNI y las 3 palabras del terreno en la interfaz de la aplicación. Si el hash generado a partir de estos datos coincide con el hash almacenado en el contrato, se mostrará un mensaje que indica la veracidad o falsedad de la propiedad.

## Requisitos

- En directorio /frontend hacer npm install

- Brew (Mac) / Chocolatey (Windows)
- Docker (Docker Desktop)
- rust, cargo y rustup
- LLVM (con wasm-ld): Disponible desde la versión 15 (`llvm@15`)

## Verificar si tenemos `wasm-strip` instalado

Si no, podemos instalarlo con `brew install wabt`

## Instalando Cargo Stylus

- fork / git clone de este repositorio
- `git submodule update --init --recursive`
- `cargo install cargo-stylus`
- `rustup target add wasm32-unknown-unknown` (**opcional**, solventa un error de target wasm32 not found al hacer make)

## Validar entorno de desarollo

- `make` para generar el archivo contract.wasm
- `cargo stylus check --wasm-file ./contract.wasm -e https://sepolia-rollup.arbitrum.io/rpc` (si tenemos output en verde estamos listos 🚀🚀)

## Uso

Clonar repositorio e instalar los requerimientos correspondientes.

En terminal, dentro de la carpeta /frontend, correr el comando npm run dev y acceder a https://localhost:3000 desde el navegador.

Para una guía completa del uso de la plataforma, ver [este vídeo de presentación](https://drive.google.com/file/d/1yDz_Nr2yO_CSc-XQEv7vzj8kZyl5XolA/view)
