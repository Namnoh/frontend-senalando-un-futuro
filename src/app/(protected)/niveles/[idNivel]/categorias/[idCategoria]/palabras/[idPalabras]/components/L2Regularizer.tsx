import * as tf from '@tensorflow/tfjs';

// Clase personalizada para el regularizador L2
class L2Regularizer extends tf.regularizers.Regularizer {
  static className = 'L2Regularizer';  // Nombre de la clase requerido por TensorFlow.js para la serialización

  l2: number;

  constructor(l2 = 0.01) {
    super();
    this.l2 = l2;
  }

  // Método para aplicar el regularizador a un tensor
  apply(x: tf.Tensor): tf.Tensor {
    if (this.l2 === 0) {
      return tf.zerosLike(x);
    }
    return tf.mul(this.l2, tf.sum(tf.square(x)));
  }

  // Método para la deserialización
  static fromConfig(cls: { l2: number }) {
    return new L2Regularizer(cls.l2);
  }
}

// Registrar la clase para poder ser usada como regularizador en los modelos
tf.serialization.registerClass(L2Regularizer);

export default L2Regularizer;
