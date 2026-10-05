document.documentElement.classList.add('js');
const menu = document.querySelector('.menu-button');
const nav = document.querySelector('.nav-links');
if (menu && nav) {
  function closeMenu(){nav.classList.remove('is-open');menu.setAttribute('aria-expanded','false');menu.textContent='Menu +';}
  menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('is-open',open);menu.textContent=open?'Close −':'Menu +';});
  nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
  document.addEventListener('keydown',event=>{if(event.key==='Escape'&&menu.getAttribute('aria-expanded')==='true'){closeMenu();menu.focus();}});
  matchMedia('(min-width:768px)').addEventListener('change',closeMenu);
}
const filters = [...document.querySelectorAll('[data-filter]')];
const sessions = [...document.querySelectorAll('[data-category]')];
filters.forEach(button=>button.addEventListener('click',()=>{
  filters.forEach(filter=>filter.setAttribute('aria-pressed',String(filter===button)));
  sessions.forEach(session=>session.hidden=button.dataset.filter!=='all'&&session.dataset.category!==button.dataset.filter);
  const count=sessions.filter(session=>!session.hidden).length;
  document.querySelector('.programme-count').textContent=`${count} session${count===1?'':'s'} to explore`;
}));
document.querySelectorAll('form[data-demo-form]').forEach(form=>{
  form.noValidate=true;
  const fields=[...form.querySelectorAll('input:not([type=checkbox]),textarea')];
  const success=form.parentElement.querySelector('.success');
  function validate(field){
    let message='';
    if(field.required&&!field.value.trim()) message='Please enter '+(field.name==='fullName'?'your full name':field.name==='email'?'your email address':'your message')+'.';
    else if(field.type==='email'&&field.validity.typeMismatch) message='Enter an email address such as name@example.com.';
    else if(field.type==='tel'&&field.value.trim()&&!/^[+\d\s()\-]{7,25}$/.test(field.value.trim())) message='Use 7–25 characters: numbers, spaces, +, ( ), or -.';
    field.setAttribute('aria-invalid',String(Boolean(message)));
    form.querySelector('#'+field.id+'-error').textContent=message;
    return !message;
  }
  fields.forEach(field=>{field.addEventListener('blur',()=>validate(field));field.addEventListener('input',()=>{if(field.getAttribute('aria-invalid')==='true')validate(field);});});
  form.addEventListener('submit',event=>{
    event.preventDefault();
    let invalid=fields.filter(field=>!validate(field));
    if(invalid.length){invalid[0].focus();return;}
    const copy=form.querySelector('[name=copy]').checked;
    success.querySelector('p:not(.eyebrow)').textContent=copy?'Your example response is complete. The copy preference is on. This demo does not send or store your details or email a copy.':'Your example response is complete. This demo does not send or store your details.';
    form.hidden=true;success.hidden=false;success.focus();
  });
  success.querySelector('button').addEventListener('click',()=>{form.reset();fields.forEach(field=>{field.removeAttribute('aria-invalid');form.querySelector('#'+field.id+'-error').textContent='';});success.hidden=true;form.hidden=false;fields[0].focus();});
});
