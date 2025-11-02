import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ActivityIndicator, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  // Ejercicio 1: Formulario
  const [usuario, setUsuario] = useState({ nombre: '', edad: '' });

  const handleNombre = (texto: string) => {
    setUsuario({ ...usuario, nombre: texto });
  };

  const handleEdad = (texto: string) => {
    if (/^\d*$/.test(texto)) {
      setUsuario({ ...usuario, edad: texto });
    }
  };

  // Ejercicio 2: Contador
  const [contador, setContador] = useState(0);

  useEffect(() => {
    console.log(`Contador actualizado: ${contador}`);
  }, [contador]);

  // Ejercicio 3: Reloj
  const [hora, setHora] = useState(new Date());

  useEffect(() => {
    const intervalo = setInterval(() => {
      setHora(new Date());
    }, 1000);
    return () => clearInterval(intervalo);
  }, []);

  const formatoHora = hora.toLocaleTimeString('es-ES', { hour12: false });

  // Ejercicio 4: Carga
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCargando(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <StatusBar style="auto" />

      {/* Ejercicio 1 */}
      <View style={styles.section}>
        <Text style={styles.titulo}>Ejercicio 1: Formulario</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre"
          value={usuario.nombre}
          onChangeText={handleNombre}
        />
        <TextInput
          style={styles.input}
          placeholder="Edad"
          keyboardType="numeric"
          value={usuario.edad}
          onChangeText={handleEdad}
        />
        {usuario.nombre && usuario.edad ? (
          <Text style={styles.texto}>Hola, {usuario.nombre}. Tienes {usuario.edad} años.</Text>
        ) : (
          <Text style={styles.texto}>Por favor ingresa tus datos</Text>
        )}
      </View>

      {/* Ejercicio 2 */}
      <View style={styles.section}>
        <Text style={styles.titulo}>Ejercicio 2: Contador</Text>
        <Text style={styles.texto}>Contador: {contador}</Text>
        <Button title="Incrementar" onPress={() => setContador(contador + 1)} />
        {contador > 0 && contador % 5 === 0 && (
          <Text style={styles.alerta}>Ha alcanzado un múltiplo de 5</Text>
        )}
      </View>

      {/* Ejercicio 3 */}
      <View style={styles.section}>
        <Text style={styles.titulo}>Ejercicio 3: Reloj</Text>
        <Text style={styles.reloj}>{formatoHora}</Text>
      </View>

      {/* Ejercicio 4 */}
      <View style={styles.section}>
        <Text style={styles.titulo}>Ejercicio 4: Carga</Text>
        {cargando ? (
          <>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text style={styles.texto}>Cargando...</Text>
          </>
        ) : (
          <Text style={styles.texto}>Bienvenido a la aplicación</Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { padding: 20 },
  section: { marginBottom: 30 },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  input: { borderWidth: 1, padding: 8, marginBottom: 10, borderRadius: 5 },
  texto: { fontSize: 18 },
  alerta: { fontSize: 18, color: 'red', marginTop: 10 },
  reloj: { fontSize: 40, fontWeight: 'bold', textAlign: 'center' },
});