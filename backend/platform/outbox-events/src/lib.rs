//! Eventos entre módulos con patrón outbox: se guardan en la misma transacción
//! y un worker los publica por Redis Streams.
