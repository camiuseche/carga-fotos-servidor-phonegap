 <?php
 /**
 *
 * K diseño digital - 2015
 * Camilo Useche Silva
 * A opesar que las imagenes se estan redimensionando por la accion de la camara del dispositivo 
 * aca se redimensionan por PHP y se les asigna un nuevo nombre con un HASH por MD5 de la fecha
 *
 */

 function carga_archivo_redimensionar($campoArchivo, $tipo, $directorio, $anchoMax, $altoMax){		 
	 	$archivo = $campoArchivo["name"];
		$ext = explode('.',$archivo);
		$extension = end($ext);
		$archivo1 = "imagen_".md5(time()).".".$extension;
		if($campoArchivo["error"] > 0) {
			return false;
		} else {
			@move_uploaded_file($campoArchivo["tmp_name"], $directorio.$archivo1);
			$img_original = $directorio.$archivo1;
			$img_nueva = $directorio.$archivo1;
			@list($ancho, $alto, $tipo, $atributo) = @getimagesize ($img_original);
			
			if ($ancho > $alto) {			
				//echo "mas ancha";
				$img_nueva_anchura = $anchoMax;
				@$img_nueva_altura = ($alto*$img_nueva_anchura)/$ancho;		
				//echo $img_nueva_altura ;
			} else {
				//echo "mas alta";
				$img_nueva_altura = $altoMax;
				@$img_nueva_anchura = ($ancho*$img_nueva_altura)/$alto;
				//echo $img_nueva_altura ;
			}
			$img_nueva_calidad = 80;
			redimensionar_jpeg($img_original, $img_nueva, $img_nueva_anchura, $img_nueva_altura, $img_nueva_calidad);	
			return true;
		}
}
function redimensionar_jpeg($img_original, $img_nueva, $img_nueva_anchura, $img_nueva_altura, $img_nueva_calidad)
{ 
	// crear una imagen desde el original 
	$img = @ImageCreateFromJPEG($img_original); 
	// crear una imagen nueva 
	$thumb = @imagecreatetruecolor($img_nueva_anchura,$img_nueva_altura); 
	// redimensiona la imagen original copiandola en la imagen 
	@ImageCopyResized($thumb,$img,0,0,0,0,$img_nueva_anchura,$img_nueva_altura,ImageSX($img),ImageSY($img)); 
 	// guardar la nueva imagen redimensionada donde indicia $img_nueva 
	@ImageJPEG($thumb,$img_nueva,$img_nueva_calidad);
	@ImageDestroy($img);

}
   $ruta = "./";
   carga_archivo_redimensionar($_FILES['file'], $tipo, $ruta, 400, $altoMax);
   //move_uploaded_file($_FILES["file"]["tmp_name"], $ruta.$nombre_imagen);
?>