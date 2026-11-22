//! Tipos mínimos comunes a todos los módulos. Mantenerlo pequeño: lo que no sea
//! realmente compartido por todos pertenece a un módulo.

use serde::{Deserialize, Serialize};
use uuid::Uuid;

/// Identificador de la empresa (inquilino) a la que pertenece un dato.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, Serialize, Deserialize)]
#[serde(transparent)]
pub struct TenantId(pub Uuid);
