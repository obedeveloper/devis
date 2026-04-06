export const load = async ({ locals }) => {
  if (!locals.user) {
    return {
      user: null,
    };
  }

  return {
    user: {
      name: locals.user.name,
      email: locals.user.email,
    },
  };
};
