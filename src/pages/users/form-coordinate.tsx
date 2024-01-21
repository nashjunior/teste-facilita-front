import React from 'react';
import { type ICreateCoordinate } from '../../definitions/coordinate';
import { Controller, type FieldError, useFormContext } from 'react-hook-form';
import { Box, HStack, Text, VStack } from '@chakra-ui/react';

interface ICartesianPlan {
  x: number | null;
  y: number | null;
}

export const FormCoordinate: React.FC = () => {
  const { control, setValue, watch, formState } =
    useFormContext<ICreateCoordinate>();
  const coordinatesWatch = watch('coordinates');

  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  const height = canvasRef.current?.height ?? 400;
  const width = canvasRef.current?.width ?? 400;

  const handleCoordinate = (x: number, y: number): Required<ICartesianPlan> => {
    const centerX = width / 2;
    const centerY = height / 2;

    let lat: number;
    // caso esteja no 1º e 3º quadrantes entra no if
    if (x < centerX) lat = x - centerX;
    else lat = Math.abs(x - centerX);

    let long: number;
    // caso seja 2º e 4º quadrantes entra no if
    if (y > centerY) long = centerY - y;
    else long = Math.abs(centerY - y);

    return { x: lat, y: long };
  };

  const drawCartesianPlane = React.useCallback(
    (context: CanvasRenderingContext2D) => {
      const centerX = width / 2;
      const centerY = height / 2;

      // Limpa o canvas
      context.clearRect(0, 0, width, height);

      // Desenha os eixos X e Y
      context.beginPath();
      context.moveTo(0, centerY);
      context.lineTo(width, centerY);
      context.moveTo(centerX, 0);
      context.lineTo(centerX, height);
      context.strokeStyle = 'black';
      context.stroke();

      // desenha o ponto original
      context?.beginPath();
      context.arc(centerX, centerY, 5, 0, 2 * Math.PI);
      context.fillStyle = 'green';
      context.fill();
      context.stroke();

      // Desenha o ponto selecionado, se existir
      if (coordinatesWatch?.[0] != null && coordinatesWatch?.[1] != null) {
        const x = coordinatesWatch[0];
        const y = coordinatesWatch[1];
        context.beginPath();
        context.arc(x, y, 5, 0, 2 * Math.PI);
        context.fillStyle = 'red';
        context.fill();
        context.stroke();
      }
    },
    [coordinatesWatch, width, height]
  );

  const handleCanvasClick: React.MouseEventHandler<HTMLCanvasElement> = (
    event
  ) => {
    if (canvasRef.current != null) {
      const canvas = canvasRef.current;

      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      setValue('coordinates', [x, y]);
    }
  };

  React.useEffect(() => {
    const context = canvasRef.current?.getContext('2d');

    if (context != null) drawCartesianPlane(context);
  }, [drawCartesianPlane]);

  return (
    <React.Fragment>
      <VStack>
        <HStack>
          <Box borderRadius="50%" bg="green" width={4} height={4} />
          <Text mt="2">
            Coordenadas da origem: X={(0).toFixed(2)}, Y=
            {(0).toFixed(2)}
          </Text>
        </HStack>

        <Controller
          control={control}
          name="coordinates"
          render={({ field: { value }, fieldState: { error } }) => {
            const coordinates =
              value?.[0] != null && value?.[1] != null
                ? handleCoordinate(value?.[0], value?.[1])
                : ({ x: null, y: null } satisfies ICartesianPlan);

            return (
              <HStack mb={4}>
                <Box borderRadius="50%" bg="red" width={4} height={4} />
                <Text mt="2">
                  Coordenada selecionada: X={coordinates?.x?.toFixed(2)}, Y=
                  {coordinates?.y?.toFixed(2)}
                </Text>
              </HStack>
            );
          }}
        />
      </VStack>

      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        onClick={handleCanvasClick}
        style={{
          border:
            formState.errors.coordinates != null
              ? '1px solid var(--chakra-colors-red-300)'
              : undefined,
        }}
      />
      {formState.errors.coordinates != null && (
        <Text color="var(--chakra-colors-red-300)">
          {(formState.errors.coordinates as FieldError)?.message}{' '}
        </Text>
      )}
    </React.Fragment>
  );
};
