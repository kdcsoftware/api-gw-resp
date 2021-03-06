import response from '../src/index';
import RESP_TEMPLATE from '../src/constants/template';

describe('Build response', () => {
  [
    {
      description: 'OK response',
      method: 'OK',
      body: { message: 'hello world' },
      expected: {
        ...RESP_TEMPLATE,
        headers: {
          ...RESP_TEMPLATE.headers,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: 'hello world' }),
      },
    },
    {
      description: 'OK response no body',
      method: 'OK',
      expected: { ...RESP_TEMPLATE },
    },
    {
      description: 'OK response string body',
      method: 'OK',
      body: 'pong',
      expected: {
        ...RESP_TEMPLATE,
        headers: {
          ...RESP_TEMPLATE.headers,
          'Content-Type': 'text/plain',
        },
        body: 'pong',
      },
    },
    {
      description: 'CREATED response',
      method: 'CREATED',
      body: { message: 'hello world' },
      expected: {
        ...RESP_TEMPLATE,
        statusCode: 201,
        headers: {
          ...RESP_TEMPLATE.headers,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: 'hello world' }),
      },
    },
    {
      description: 'CREATED response no body',
      method: 'CREATED',
      expected: {
        ...RESP_TEMPLATE,
        statusCode: 201,
      },
    },
    {
      description: 'NO_CONTENT response body ignored',
      method: 'NO_CONTENT',
      body: { message: 'hello world' },
      expected: {
        ...RESP_TEMPLATE,
        statusCode: 204,
      },
    },
    {
      description: 'NO_CONTENT response no body',
      method: 'NO_CONTENT',
      expected: {
        ...RESP_TEMPLATE,
        statusCode: 204,
      },
    },
    {
      description: 'BAD_REQUEST response',
      method: 'BAD_REQUEST',
      errorMsg: 'my bad',
      expected: {
        ...RESP_TEMPLATE,
        statusCode: 400,
        headers: {
          ...RESP_TEMPLATE.headers,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          statusCode: 400,
          error: 'Bad Request',
          message: 'my bad',
        }),
      },
    },
    {
      description: 'BAD_REQUEST response no body',
      method: 'BAD_REQUEST',
      expected: {
        ...RESP_TEMPLATE,
        statusCode: 400,
        headers: {
          ...RESP_TEMPLATE.headers,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          statusCode: 400,
          error: 'Bad Request',
        }),
      },
    },
    {
      description: 'UNAUTHORIZED response',
      method: 'UNAUTHORIZED',
      errorMsg: 'wrong password',
      expected: {
        ...RESP_TEMPLATE,
        statusCode: 401,
        headers: {
          ...RESP_TEMPLATE.headers,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          statusCode: 401,
          error: 'Unauthorized',
          message: 'wrong password',
        }),
      },
    },
    {
      description: 'UNAUTHORIZED response no body',
      method: 'UNAUTHORIZED',
      expected: {
        ...RESP_TEMPLATE,
        statusCode: 401,
        headers: {
          ...RESP_TEMPLATE.headers,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          statusCode: 401,
          error: 'Unauthorized',
        }),
      },
    },
    {
      description: 'FORBIDDEN response',
      method: 'FORBIDDEN',
      errorMsg: 'no permission',
      expected: {
        ...RESP_TEMPLATE,
        statusCode: 403,
        headers: {
          ...RESP_TEMPLATE.headers,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          statusCode: 403,
          error: 'Forbidden',
          message: 'no permission',
        }),
      },
    },
    {
      description: 'FORBIDDEN response no body',
      method: 'FORBIDDEN',
      expected: {
        ...RESP_TEMPLATE,
        statusCode: 403,
        headers: {
          ...RESP_TEMPLATE.headers,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          statusCode: 403,
          error: 'Forbidden',
        }),
      },
    },
    {
      description: 'NOT_FOUND response',
      method: 'NOT_FOUND',
      errorMsg: 'not here',
      expected: {
        ...RESP_TEMPLATE,
        statusCode: 404,
        headers: {
          ...RESP_TEMPLATE.headers,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          statusCode: 404,
          error: 'Not Found',
          message: 'not here',
        }),
      },
    },
    {
      description: 'NOT_FOUND response no body',
      method: 'NOT_FOUND',
      expected: {
        ...RESP_TEMPLATE,
        statusCode: 404,
        headers: {
          ...RESP_TEMPLATE.headers,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          statusCode: 404,
          error: 'Not Found',
        }),
      },
    },
    {
      description: 'CONFLICT response',
      method: 'CONFLICT',
      errorMsg: 'you are late',
      expected: {
        ...RESP_TEMPLATE,
        statusCode: 409,
        headers: {
          ...RESP_TEMPLATE.headers,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          statusCode: 409,
          error: 'Conflict',
          message: 'you are late',
        }),
      },
    },
    {
      description: 'CONFLICT response no body',
      method: 'CONFLICT',
      expected: {
        ...RESP_TEMPLATE,
        statusCode: 409,
        headers: {
          ...RESP_TEMPLATE.headers,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          statusCode: 409,
          error: 'Conflict',
        }),
      },
    },
    {
      description: 'SERVER_ERROR response',
      method: 'SERVER_ERROR',
      errorMsg: 'our bad',
      expected: {
        ...RESP_TEMPLATE,
        statusCode: 500,
        headers: {
          ...RESP_TEMPLATE.headers,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          statusCode: 500,
          error: 'Internal Server Error',
          message: 'our bad',
        }),
      },
    },
    {
      description: 'SERVER_ERROR response no body',
      method: 'SERVER_ERROR',
      expected: {
        ...RESP_TEMPLATE,
        statusCode: 500,
        headers: {
          ...RESP_TEMPLATE.headers,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          statusCode: 500,
          error: 'Internal Server Error',
        }),
      },
    },
    {
      description: 'ERROR response Bad Request',
      method: 'ERROR',
      errorMsg: 'Missing parameter',
      expected: {
        ...RESP_TEMPLATE,
        statusCode: 400,
        headers: {
          ...RESP_TEMPLATE.headers,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          statusCode: 400,
          error: 'Bad Request',
          message: 'Missing parameter',
        }),
      },
    },
    {
      description: 'ERROR response unauthorized',
      method: 'ERROR',
      errorMsg: 'You are unauthorized. Please login.',
      expected: {
        ...RESP_TEMPLATE,
        statusCode: 401,
        headers: {
          ...RESP_TEMPLATE.headers,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          statusCode: 401,
          error: 'Unauthorized',
          message: 'You are unauthorized. Please login.',
        }),
      },
    },
    {
      description: 'ERROR response forbidden',
      method: 'ERROR',
      errorMsg: 'You are forbidden to access this resource.',
      expected: {
        ...RESP_TEMPLATE,
        statusCode: 403,
        headers: {
          ...RESP_TEMPLATE.headers,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          statusCode: 403,
          error: 'Forbidden',
          message: 'You are forbidden to access this resource.',
        }),
      },
    },
    {
      description: 'ERROR response not allowed',
      method: 'ERROR',
      errorMsg: 'You are not allowed to access this resource.',
      expected: {
        ...RESP_TEMPLATE,
        statusCode: 403,
        headers: {
          ...RESP_TEMPLATE.headers,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          statusCode: 403,
          error: 'Forbidden',
          message: 'You are not allowed to access this resource.',
        }),
      },
    },
    {
      description: 'ERROR response not found',
      method: 'ERROR',
      errorMsg: 'Resource not found.',
      expected: {
        ...RESP_TEMPLATE,
        statusCode: 404,
        headers: {
          ...RESP_TEMPLATE.headers,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          statusCode: 404,
          error: 'Not Found',
          message: 'Resource not found.',
        }),
      },
    },
    {
      description: 'ERROR response conflict',
      method: 'ERROR',
      errorMsg: 'Item is a duplicate.',
      expected: {
        ...RESP_TEMPLATE,
        statusCode: 409,
        headers: {
          ...RESP_TEMPLATE.headers,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          statusCode: 409,
          error: 'Conflict',
          message: 'Item is a duplicate.',
        }),
      },
    },
    {
      description: 'ERROR response server error',
      method: 'ERROR',
      errorMsg: "We don't know this error",
      expected: {
        ...RESP_TEMPLATE,
        statusCode: 500,
        headers: {
          ...RESP_TEMPLATE.headers,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          statusCode: 500,
          error: 'Internal Server Error',
          message: "We don't know this error",
        }),
      },
    },
  ].forEach(({ description, method, body, errorMsg, expected }) => {
    test(description, async () => {
      let request;
      if (body) request = response[method]({ body });
      else if (errorMsg) request = response[method]({ message: errorMsg });
      else request = response[method]();
      if (expected) {
        expect(request).toEqual(expected);
      }
    });
  });

  test('GET with no cors', async () => {
    const request = response.OK({
      body: { message: 'hello world' },
      cors: false,
    });

    expect(request).toEqual({
      ...RESP_TEMPLATE,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: 'hello world' }),
    });
  });

  test('GET with origin', async () => {
    const request = response.OK({
      body: { message: 'hello world' },
      origin: 'trustedorigin.com',
    });

    expect(request).toEqual({
      ...RESP_TEMPLATE,
      headers: {
        ...RESP_TEMPLATE.headers,
        'Access-Control-Allow-Origin': 'trustedorigin.com',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message: 'hello world' }),
    });
  });

  test('NO_CONTENT should have no Content-Type', async () => {
    const request = response.NO_CONTENT();
    expect(request.headers).not.toHaveProperty('Content-Type');
  });

  test('REDIRECT Permanent', async () => {
    const resp = response.REDIRECT({
      permanent: true,
      location: 'https://www.kdcsoftware.com',
    });

    expect(resp).toEqual({
      ...RESP_TEMPLATE,
      statusCode: 301,
      headers: {
        ...RESP_TEMPLATE.headers,
        Location: 'https://www.kdcsoftware.com',
      },
      body: null,
    });
  });

  test('REDIRECT Temporary', async () => {
    const resp = response.REDIRECT({
      permanent: false,
      location: 'https://www.kdcsoftware.com',
    });

    expect(resp).toEqual({
      ...RESP_TEMPLATE,
      statusCode: 302,
      headers: {
        ...RESP_TEMPLATE.headers,
        Location: 'https://www.kdcsoftware.com',
      },
      body: null,
    });
  });

  test('Override Content-Type', async () => {
    const request = response.OK({
      body: 'hello',
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
      },
    });
    expect(request.headers['Content-Type']).toBe('text/html; charset=utf-8');
  });
});
