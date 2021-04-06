export const findFromHasIdParentForId = (target) => {
  while (target) {
    if (target?.dataset?.id) {
      return target.dataset.id;
    }
    target = target.parentNode;
  }
};
