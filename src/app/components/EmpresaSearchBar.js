'use client';

import { useEffect, useRef, useState } from "react";
import { getEmpresas, getEmpresaByName } from "@/services/Empresas/EmpresasService";

const DEBOUNCE_MS = 300;

export default function EmpresaSearchBar({ onResults, onLoading, onError }) {
    const [query, setQuery] = useState('');
    const [searching, setSearching] = useState(false);
    const [open, setOpen] = useState(false);
    const debounceRef = useRef(null);
    const requestIdRef = useRef(0);
    const mountedRef = useRef(true);
    const inputRef = useRef(null);

    useEffect(() => {
        mountedRef.current = true;
        return () => {
            mountedRef.current = false;
            if (debounceRef.current) clearTimeout(debounceRef.current);
        };
    }, []);

    useEffect(() => {
        if (open && inputRef.current) {
            inputRef.current.focus();
        }
    }, [open]);

    const fetchForQuery = async (q) => {
        const localRequestId = ++requestIdRef.current;
        const trimmed = q.trim().toLowerCase();

        try {
            onLoading(true);
            onError(null);

            let res;
            if (!trimmed) {
                setSearching(false);
                res = await getEmpresas();
            } else {
                setSearching(true);
                res = await getEmpresaByName(trimmed);
            }

            if (!mountedRef.current || localRequestId !== requestIdRef.current) return;

            if (Array.isArray(res)) onResults(res);
            else if (res) onResults([res]);
            else onResults([]);
        } catch (err) {
            if (mountedRef.current && localRequestId === requestIdRef.current) onError(err);
            console.error("Error buscando empresa por nombre:", err);
        } finally {
            if (mountedRef.current && localRequestId === requestIdRef.current) onLoading(false);
        }
    };

    useEffect(() => {
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => {
            fetchForQuery(query);
        }, DEBOUNCE_MS);
    }, [query]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (debounceRef.current) clearTimeout(debounceRef.current);
        fetchForQuery(query);
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setQuery('');
        if (debounceRef.current) clearTimeout(debounceRef.current);
        fetchForQuery('');
    };

    return (
        <div className="mb-4 w-full">
            {/* Contenedor centrado */}
            <div
                className="relative w-full flex justify-center items-center"
                // Reservamos altura suficiente para que al abrir no empuje el contenido
                style={{ minHeight: 44 }} // <-- antes era 4 (px), ahora 44px (altura del control)
            >
                {/* Botón lupa centrado */}
                {!open && (
                    <button
                        type="button"
                        onClick={handleOpen}
                        aria-label="Abrir búsqueda"
                        className="p-2 bg-transparent rounded hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-black dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
                        </svg>
                    </button>
                )}

                {/* Barra de búsqueda: se expande desde el centro del botón */}
                <div
                    style={{
                        position: 'absolute',
                        left: '50%',
                        top: '50%',
                        transformOrigin: 'center center',
                        transform: open ? 'translate(-50%, -50%) scaleX(1)' : 'translate(-50%, -50%) scaleX(0)',
                        transition: 'transform 300ms ease, opacity 300ms ease',
                        opacity: open ? 1 : 0,
                        pointerEvents: open ? 'auto' : 'none',
                        width: 'min(90vw, 520px)',
                        zIndex: 50,
                        willChange: 'transform, opacity' // ayuda a la suavidad de la animación
                    }}
                    aria-hidden={!open}
                >
                    <form
                        onSubmit={handleSubmit}
                        className="flex items-center gap-2 bg-white dark:bg-gray-800 p-2 rounded shadow"
                        style={{ transformOrigin: 'center center' }}
                    >
                        <button
                            type="button"
                            onClick={handleClose}
                            aria-label="Cerrar búsqueda"
                            className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        <input
                            ref={inputRef}
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Buscar empresa por nombre..."
                            className="flex-1 p-2 border rounded bg-white text-black placeholder-gray-500 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
                        />

                        <button type="submit" className="px-3 py-2 bg-blue-600 text-white rounded" aria-label="Buscar">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
                            </svg>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
