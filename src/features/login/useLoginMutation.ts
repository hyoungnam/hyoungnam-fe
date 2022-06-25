import { useMutation } from 'react-query';
import { useRouter } from 'next/router';
import { useAuthInfoDispatch } from 'src/context/AuthProvider';
import { loginApi } from 'src/api';

export const useLoginMutation = () => {
  const dispatch = useAuthInfoDispatch();
  const router = useRouter();
  
  return useMutation('login', loginApi, {
    onSuccess: ({ data: { user, accessToken } }) => {
      dispatch?.login(user, accessToken);
      router.push('/');
    },
    onError: (err) => alert(err),
  });
};
