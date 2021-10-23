Select 
  distinct products.id ,
  products.name, 
  tags.id as tagId, 
  tags.name as tagName
from (
  (productTag INNER JOIN products ON productTag.productId = products.id) INNER JOIN tags ON productTag.tagId = tags.id)
where tags.id in (1,2);