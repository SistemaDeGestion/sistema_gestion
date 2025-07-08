import React, { useState } from 'react';
import '../PagHome/PagHome.css'
import { Link } from 'react-router-dom';
import { CheckIcon } from '@heroicons/react/20/solid'
import ReactPlayer from 'react-player';


function PagHome() {
    
    const tiers = [
        {
            name: 'Básico',
            id: 'tier-hobby',
            href: '#',
            priceMonthly: '$9',
            description: "Ideal para equipos pequeños o startups que buscan una solución sencilla para organizar sus proyectos.",
            features: [
                'Gestión de tareas y proyectos ilimitados',
                'Acceso para hasta 5 usuarios',
                'Tableros Kanban básicos',
                'Seguimiento de progreso en tiempo real',
                'Informes básicos de rendimiento'],
            featured: false,
        },
        {
            name: 'Profesional',
            id: 'tier-enterprise',
            href: '#',
            priceMonthly: '$29',
            description: 'Diseñado para empresas en crecimiento que necesitan herramientas avanzadas y mayor capacidad de colaboración.',
            features: [
                'Todo lo del Plan Básico, más:',
                'Acceso para hasta 50 usuarios',
                'Integraciones con herramientas populares (Google Calendar, Slack, Trello, etc.)',
                'Informes avanzados y análisis personalizados',
                'Espacios de trabajo compartidos para equipos grandes',
                'Soporte prioritario (respuesta en menos de 4 horas)',
                'API para integraciones personalizadas',
            ],
            featured: true,
        },
    ]
    
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }
    
    function openMenu() {
        const menu = document.getElementById('menu');

        if (menu.classList.contains('hidden')) {
            menu.classList.remove('hidden');
        } else {
            menu.classList.add('hidden');
        }


    }
    return (
        <>
            <header className="fixed absolute inset-x-0 top-0 z-50 bg-gray-800">
                {/* Barra de navegación */}
                <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
                    {/*logo */}
                    <div className="flex lg:flex-1">
                        <a className="-m-1.5 p-1.5">
                            <span className="sr-only">Your Company</span>
                            <img className="h-8 w-auto" src="../src/assets/react.svg"
                                alt="" />
                        </a>
                    </div>
                    {/*boton menu en movil */}
                    <div className="flex lg:hidden">
                        <button onClick={openMenu} type="button"
                            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
                            <span className="sr-only">Open main menu</span>
                            <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                aria-hidden="true" data-slot="icon">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        </button>
                    </div>
                    {/*link de navegación */}
                    <div id="menu"
                        className="borde_ hidden lg:items-center lg:flex lg:flex-1 lg:justify-center lg:gap-x-12 absolute 
                 lg:relative top-20 left-0 lg:top-0 bg-gray-800 w-full flex flex-col lg:flex-row py-14 lg:py-0 px-8 mb-8 lg:mb-0">
                        <a href="#inicio" className=" font-semibold rounded-lg text-white lg:mr-7 mb-8 lg:mb-0">Inicio</a>
                        <a href="#servicios"
                            className="font-semibold rounded-lg text-white lg:mr-7 mb-8 lg:mb-0">Servicios</a>
                        <a href="#planes"
                            className=" font-semibold rounded-lg text-white lg:mr-7 mb-8 lg:mb-0">Planes</a>
                        <a href="#contacto" className="font-semibold rounded-lg text-white lg:mr-7 mb-8 lg:mb-0">Contacto</a>
                        <div className="login lg:flex rounded-md px-3.5 py-2 w-max">
                            <a href="/login" className="rounded-lg font-semibold color-[#5bd6d6]">
                                Iniciar sesión
                            </a>
                        </div>
                    </div>
                </nav>
            </header>
            {/* Sección de inicio */}
            <div className="bg-white fondo">
                <div id="inicio" className="relative px-6 pt-14 lg:px-8">
                    <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
                        <div className="text-center colortext">
                            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                                Bienvenido a Project Control</h1>
                            <p className="mt-4 text-xl font-medium text-w">Optimiza tu flujo de trabajo, mejora la colaboración y alcanza tus objetivos con nuestra solución integral de gestión de proyectos.</p>
                            <div className="mt-10 flex items-center justify-center gap-x-6">
                                <Link to="/register">
                                    <button type="submit" className="rounded-md px-3.5 py-2.5 text-lg font-semibold cursor-pointer">
                                        Empezar
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Sección Servicios */}
            <section id="servicios" className=" bg-gray-200 sm:py-24 lg:py-32">
                <div className='py-5'>
                    <div className="text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Nuestros Servicios</h1>
                        <p className="mt-4 text-xl">Ofrecemos un sistema de gestión de proyectos
                            intuitivo y eficiente, diseñado para optimizar el flujo de trabajo de
                            tu equipo.</p>
                    </div>
                    <div className="p-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Servicio 1 */}
                        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                            <img src="./public/gestion_tareas.gif" alt="" width={150} className='m-auto' />
                            <h3 className="text-2xl font-semibold text-gray-900">Gestión de tareas</h3>
                            <p className="mt-4 text-xl"> Organiza todas tus actividades en un solo lugar. Crea, asigna y visualiza el flujo de trabajo para una ejecución sin problemas.</p>
                        </div>
                        {/* Servicio 2 */}
                        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                            <img src="./public/cooperacion.gif" alt="" width={150} className='m-auto' />
                            <h3 className="text-2xl font-semibold text-gray-900">Colaboración eficiente</h3>
                            <p className="mt-4 text-xl">Facilita la comunicación entre los miembros del equipo con espacios de trabajo compartidos y comentarios en tareas para trabajar juntos sin interrupciones.</p>
                        </div>
                        {/* Servicio 3 */}
                        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                            <img src="./public/informe.gif" alt="" width={150} className='m-auto' />
                            <h3 className="text-2xl font-semibold text-gray-900">Informes detallados</h3>
                            <p className="mt-4 text-xl">Genera reportes personalizados con métricas clave para analizar el rendimiento del equipo, los tiempos de entrega y el progreso general del proyecto. </p>
                        </div>
                    </div>
                </div>
                {/* Como funciona */}
                <div className="relative overflow-hidden bg-gray-200 mt-5">
                    <div className=" pb-80 sm:pt-24 sm:pb-40 lg:pt-20 lg:pb-48">
                        <div className="relative mx-auto max-w-7xl sm:static sm:px-6 lg:px-8 px-8">
                            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-5">¿Cómo Funciona?</h1>
                            <div className='mx-auto grid grid-cols-1 md:grid-cols-2 gap-8'>
                                <div className="sm:max-w-lg p-5">
                                    <p className='pb-2'>Descubre lo fácil que es gestionar tus proyectos. Mira nuestro video a continuación para ver cómo puedes:</p>
                                    <div className='flex items-center py-5'>
                                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke-width="1.5">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM7.53044 11.9697C7.23755 11.6768 6.76268 11.6768 6.46978 11.9697C6.17689 12.2626 6.17689 12.7374 6.46978 13.0303L9.46978 16.0303C9.76268 16.3232 10.2376 16.3232 10.5304 16.0303L17.5304 9.03033C17.8233 8.73744 17.8233 8.26256 17.5304 7.96967C17.2375 7.67678 16.7627 7.67678 16.4698 7.96967L10.0001 14.4393L7.53044 11.9697Z" fill="#5bd6d6">
                                            </path>
                                        </svg>
                                        <p className='text-3xl ml-2'>Regístrate y crea tu equipo</p>
                                    </div>
                                    <div className='flex items-center py-5'>
                                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke-width="1.5">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM7.53044 11.9697C7.23755 11.6768 6.76268 11.6768 6.46978 11.9697C6.17689 12.2626 6.17689 12.7374 6.46978 13.0303L9.46978 16.0303C9.76268 16.3232 10.2376 16.3232 10.5304 16.0303L17.5304 9.03033C17.8233 8.73744 17.8233 8.26256 17.5304 7.96967C17.2375 7.67678 16.7627 7.67678 16.4698 7.96967L10.0001 14.4393L7.53044 11.9697Z" fill="#5bd6d6">
                                            </path>
                                        </svg>
                                        <p className='text-3xl ml-2'>Invita a tus colaboradores</p>
                                    </div>
                                    <div className='flex items-center py-5'>
                                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke-width="1.5">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM7.53044 11.9697C7.23755 11.6768 6.76268 11.6768 6.46978 11.9697C6.17689 12.2626 6.17689 12.7374 6.46978 13.0303L9.46978 16.0303C9.76268 16.3232 10.2376 16.3232 10.5304 16.0303L17.5304 9.03033C17.8233 8.73744 17.8233 8.26256 17.5304 7.96967C17.2375 7.67678 16.7627 7.67678 16.4698 7.96967L10.0001 14.4393L7.53044 11.9697Z" fill="#5bd6d6">
                                            </path>
                                        </svg>
                                        <p className='text-3xl ml-2'>Crea proyectos y asigna tareas</p>
                                    </div>
                                    <div className='flex items-center py-5'>
                                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke-width="1.5">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25ZM7.53044 11.9697C7.23755 11.6768 6.76268 11.6768 6.46978 11.9697C6.17689 12.2626 6.17689 12.7374 6.46978 13.0303L9.46978 16.0303C9.76268 16.3232 10.2376 16.3232 10.5304 16.0303L17.5304 9.03033C17.8233 8.73744 17.8233 8.26256 17.5304 7.96967C17.2375 7.67678 16.7627 7.67678 16.4698 7.96967L10.0001 14.4393L7.53044 11.9697Z" fill="#5bd6d6">
                                            </path>
                                        </svg>
                                        <p className='text-3xl ml-2'>Supervisa el progreso</p>
                                    </div>
                                    <div className='flex justify-end items-center text-xl'>
                                        <p className='text-gray-900 font-semibold'>Ver video</p>
                                        <svg className="w-20 h-15 text-[#5bd6d6]" aria-hidden="true" width="100" height="100" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M19 12H5m14 0-4 4m4-4-4-4" />
                                        </svg>
                                    </div>

                                </div>
                                    {/* Video */}
                                <div className="player-wrapper">
                                    <ReactPlayer
                                        className="react-player"
                                        url="./public/video_funcionamiento.mp4" // URL del video (puede ser YouTube, Vimeo, un archivo local, etc.)
                                        width="100%"
                                        height="100%"
                                        controls={true} // Muestra los controles del reproductor
                                        playing={false} // El video no se reproduce automáticamente
                                        light={false} // No muestra una vista previa ligera
                                        volume={0.8} // Volumen inicial (0 a 1)
                                    />
                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </section>
            {/* Planes */}
            <div id='planes' className="relative bg-white px-6 py-24 sm:py-32 lg:px-8">
                <div aria-hidden="true" className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl">
                    <div
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                        className="mx-auto aspect-1155/678 w-[72.1875rem] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
                    />
                </div>
                <div className="mx-auto max-w-4xl text-center">
                    <p className="mt-2 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-6xl">
                        Elige el plan adecuado para ti
                    </p>
                </div>
                <p className="mx-auto mt-6 max-w-2xl text-center text-lg font-medium text-pretty text-gray-600 sm:text-xl/8">
                    Elige el plan que mejor se adapte a las necesidades de tu equipo. Ya sea que estés comenzando o gestionando proyectos complejos, tenemos la solución perfecta para ti.
                </p>
                <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-2">
                    {tiers.map((tier, tierIdx) => (
                        <div
                            key={tier.id}
                            className={classNames(
                                tier.featured ? 'relative bg-gray-900 shadow-2xl' : 'bg-white/60 sm:mx-8 lg:mx-0',
                                tier.featured
                                    ? ''
                                    : tierIdx === 0
                                        ? 'rounded-t-3xl sm:rounded-b-none lg:rounded-tr-none lg:rounded-bl-3xl'
                                        : 'sm:rounded-t-none lg:rounded-tr-3xl lg:rounded-bl-none',
                                'rounded-3xl p-8 ring-1 ring-gray-400 sm:p-10',
                            )}
                        >
                            <h3
                                id={tier.id}
                                className={classNames(tier.featured ? 'text-[#5bd6d6]' : 'text-[#5bd6d6]', 'text-base/7 font-semibold')}
                            >
                                {tier.name}
                            </h3>
                            <p className="mt-4 flex items-baseline gap-x-2">
                                <span
                                    className={classNames(
                                        tier.featured ? 'text-white' : 'text-gray-900',
                                        'text-5xl font-semibold tracking-tight',
                                    )}
                                >
                                    {tier.priceMonthly}
                                </span>
                                <span className={classNames(tier.featured ? 'text-gray-400' : 'text-gray-500', 'text-base')}>/mes</span>
                            </p>
                            <p className={classNames(tier.featured ? 'text-gray-300' : 'text-gray-600', 'mt-6 text-base/7')}>
                                {tier.description}
                            </p>
                            <ul
                                role="list"
                                className={classNames(
                                    tier.featured ? 'text-gray-300' : 'text-gray-600',
                                    'mt-8 space-y-3 text-sm/6 sm:mt-10',
                                )}
                            >
                                {tier.features.map((feature) => (
                                    <li key={feature} className="flex gap-x-3">
                                        <CheckIcon
                                            aria-hidden="true"
                                            className={classNames(tier.featured ? 'text-[#5bd6d6]' : 'text-[#5bd6d6]', 'h-6 w-5 flex-none')}
                                        />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <a
                                href={tier.href}
                                aria-describedby={tier.id}
                                className={classNames(
                                    tier.featured
                                        ? 'bg-[#5bd6d6] text-[#1e2939] hover:text-white shadow-xs hover:bg-[#1e2939] focus-visible:outline-[#1e2939] hover:ring-1 hover:ring-white'
                                        : 'text-[#5bd6d6] ring-1 ring-[#5bd6d6] ring-inset hover:ring-[#1e2939] hover:text-[#1e2939]',
                                    'mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 sm:mt-10',
                                )}
                            >
                                Empieza hoy
                            </a>
                        </div>
                    ))}
                </div>
            </div>
            {/* Acerca de Nosotros */}
            <section>
                <div className="relative overflow-hidden bg-gray-200 mt-5">
                    <div className="pt-16 pb-80 sm:pt-24 sm:pb-40 lg:pt-40 lg:pb-48">
                        <div className="relative mx-auto max-w-7xl px-4 sm:static sm:px-6 lg:px-8">
                            <div className="sm:max-w-lg">
                                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Acerca de Nosotros</h1>
                                <p className="mt-4 text-xl">Project Control nació de la necesidad de simplificar la gestión de proyectos para equipos de todos los tamaños. Fundada en 2025, nuestra misión es proporcionar herramientas intuitivas y potentes que permitan a las organizaciones alcanzar sus objetivos de manera eficiente y efectiva.</p>
                            </div>
                            <div>
                                <div className="mt-10">
                                    {/* Rejilla de imagen decorativa */}
                                    <div aria-hidden="true"
                                        className="pointer-events-none lg:absolute lg:inset-y-0 lg:mx-auto lg:w-full lg:max-w-7xl">
                                        <div
                                            className="absolute transform sm:top-0 sm:left-1/2 sm:translate-x-8 lg:top-1/2 lg:left-1/2 lg:-translate-y-1/2 lg:translate-x-8">
                                            <div className="flex items-center space-x-6 lg:space-x-8">
                                                <div className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                                                    <div className="h-64 w-44 overflow-hidden rounded-lg sm:opacity-0 lg:opacity-100">
                                                        <img src="./public/equipo3.jpg"
                                                            alt="" className="size-full object-cover" />
                                                    </div>
                                                    <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                        <img src="./public/equipo7.jpg"
                                                            alt="" className="size-full object-cover" />
                                                    </div>
                                                </div>
                                                <div className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                                                    <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                        <img src="./public/equipo2.jpg" alt="" className="size-full object-cover" />
                                                    </div>
                                                    <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                        <img src="./public/equipo5.jpg" alt="" className="size-full object-cover" />
                                                    </div>
                                                    <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                        <img src="./public/equipo4.jpg"
                                                            alt="" className="size-full object-cover" />
                                                    </div>
                                                </div>
                                                <div className="grid shrink-0 grid-cols-1 gap-y-6 lg:gap-y-8">
                                                    <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                        <img src="./public/equipo6.jpg"
                                                            alt="" className="size-full object-cover" />
                                                    </div>
                                                    <div className="h-64 w-44 overflow-hidden rounded-lg">
                                                        <img src="./public/equipo1.jpg"
                                                            alt="" className="size-full object-cover" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Contacto */}
            <section id="contacto" className="relative overflow-hidden bg-gray-900 sm:py-24 lg:py-20">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 my-10">
                    <div className="text-center my-25">
                        <h2 className="text-center text-4xl font-bold tracking-tight text-white sm:text-6xl">Contacto</h2>
                    </div>
                    <div className="m-auto mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
                        <div className="m-auto grid grid-cols-1 gap-x-8 gap-y-10">
                            {/* Dirección */}
                            <div className="flex flex-col items-start">
                                <div className='flex items-center'>
                                    <div class="rounded-md bg-white/5 p-2 ring-1 ring-white/10">
                                        <svg class="size-6 text-white" viewBox="0 0 16 16" fill="none" stroke="currentColor"
                                            aria-hidden="true" data-slot="icon">
                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                d="M7.53854 14.8413L7.54225 14.8441L7.54402 14.8455C7.81 15.05 8.19 15.05 8.45647 14.8451L8.45775 14.8441L8.46146 14.8413L8.47342 14.832C8.48058 14.8264 8.48976 14.8192 8.50087 14.8104C8.50524 14.8069 8.5099 14.8032 8.51485 14.7993C8.54997 14.7713 8.59982 14.7311 8.66228 14.6791C8.78713 14.5752 8.96279 14.4243 9.17232 14.2312C9.59046 13.8459 10.1484 13.2881 10.7079 12.5969C11.8105 11.2349 13 9.25535 13 7C13 4.23858 10.7614 2 8 2C5.23858 2 3 4.23858 3 7C3 9.25535 4.18946 11.2349 5.29207 12.5969C5.8516 13.2881 6.40954 13.8459 6.82768 14.2312C7.03721 14.4243 7.21286 14.5752 7.33772 14.6791C7.40018 14.7311 7.45003 14.7713 7.48515 14.7993C7.50272 14.8133 7.51661 14.8242 7.52658 14.832L7.53854 14.8413ZM8 8.5C8.82843 8.5 9.5 7.82843 9.5 7C9.5 6.17157 8.82843 5.5 8 5.5C7.17157 5.5 6.5 6.17157 6.5 7C6.5 7.82843 7.17157 8.5 8 8.5Z" />
                                        </svg>
                                    </div>
                                    <h6 className="ml-2 font-semibold text-white text-xl">Ubicación</h6>
                                </div>
                                <p className="mt-4 text-base font-semibold text-gray-400">
                                    Dirección: Av. Rómulo Gallegos, Con 1ra. Transversal de Montecristo Edificio Universidad Alejandro de Humboldt.
                                </p>
                                <p className="mt-4 text-base font-semibold text-gray-400">
                                    Teléfono:<a href="tel:+02122370568"> (0212)2370568</a>
                                </p>
                            </div>
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3923.0719125382384!2d-66.83126872576439!3d10.49499736432335!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c2a59cbca2746bd%3A0xfccc4385c36177c8!2sUniversidad%20Alejandro%20de%20Humboldt!5e0!3m2!1ses!2sve!4v1739909678420!5m2!1ses!2sve"
                                width="500" height="450" allowfullscreen="" className='w-[100%]'
                                loading="lazy" referrerpolicy="no-referrer-when-downgrade">
                            </iframe>
                        </div>

                        {/* Formulario */}
                        <div className="max-w-xl lg:max-w-lg">
                            <h2 className="text-3xl font-semibold tracking-tight text-white mb-4">¡Estamos aquí para ayudarte!</h2>
                            <p className="mt-4 text-xl text-gray-500">¿Tienes preguntas o necesitas más información? Completa el formulario a continuación, llámanos o envíanos un correo
                                electrónico.</p>
                            <div className="mt-6  sm:w-full ">
                                <form className="space-y-6" action="#" method="POST">
                                    <div>
                                        <label for="name" className="sr-only">Nombre</label>
                                        <div className="mt-2">
                                            <input type="name" name="name" id="name" autocomplete="name" required
                                                className="block w-full flex-auto rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-yellow-300 sm:text-sm/6"
                                                placeholder="Ingrese su nombre" />
                                        </div>
                                    </div>
                                    <div>
                                        <label for="email" className="sr-only">Correo electrónico</label>
                                        <div className="mt-2">
                                            <input type="email" name="email" id="email" autocomplete="email" required
                                                className="block w-full flex-auto rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-yellow-300 sm:text-sm/6"
                                                placeholder="Ingrese su correo" />
                                        </div>
                                    </div>
                                    <div className="col-span-full">
                                        <label for="about" className="sr-only">Mensaje</label>
                                        <div className="mt-2">
                                            <textarea name="about" id="about" rows="3"
                                                className="block w-full flex-auto rounded-md bg-white/5 px-3.5 py-2 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-yellow-300  sm:text-sm/6"
                                                placeholder="Escriba un mensaje"></textarea>
                                        </div>
                                    </div>
                                    <div>
                                        <button type="submit"
                                            className="rounded-md px-3.5 py-2.5 text-sm font-semibold cursor-pointer hover:ring-1 hover:ring-white">Enviar
                                            mensaje</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Footer */}
            <footer className="bg-gray-900 text-white text-center py-4 border-t-1 border-white" >
                {/* Redes sociales */}
                <div className='flex justify-between mx-4'>
                    <p className="font-medium">&copy; 2025 Agencia Web. Todos los derechos reservados.</p>
                    <div className="icon_social">
                        <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10 cursor-pointer">
                            <svg className="size-6 text-white" fill="currentColor" viewBox="0 0 448 512">
                                <path
                                    d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                            </svg>
                        </div>
                        <div className="mx-3 rounded-md bg-white/5 p-2 ring-1 ring-white/10 cursor-pointer">
                            <svg className="size-6 text-white" fill="currentColor" viewBox="0 0 448 512">
                                <path
                                    d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z" />
                            </svg>
                        </div>
                        <div className="rounded-md bg-white/5 p-2 ring-1 ring-white/10 cursor-pointer">
                            <svg className="size-6 text-white" fill="currentColor" viewBox="0 0 448 512">
                                <path
                                    d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default PagHome;