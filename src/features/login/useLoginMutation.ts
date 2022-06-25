import { useMutation } from 'react-query';
import { useRouter } from 'next/router';
import { useUserInfoDispatch } from 'src/context/user';
import { loginApi } from 'src/api';

export const useLoginMutation = () => {
  const dispatch = useUserInfoDispatch();
  const router = useRouter();

  return useMutation('login', loginApi, {
    onSuccess: ({ data: { user } }) => {
      dispatch?.login(user);
      router.push('/');
    },
    onError: (err) => alert(err),
  });
};
